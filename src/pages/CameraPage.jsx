import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../public/assets/css/CameraPage.css"; // Ensure you have a CSS file for styling
import api from "../api";

const CameraPage = () => {
  const videoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null); // Reference for the canvas element
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
  const [location, setLocation] = useState({ latitude: null, longitude: null }); // State to store user's location
  const [locationError, setLocationError] = useState(null); // State to store location errors
  const [cameraError, setCameraError] = useState(null); // State to store camera errors
  const [devices, setDevices] = useState([]); // State to store available camera devices
  const [cameraType, setCameraType] = useState("user");
  const [imageId, setImageId] = useState(null); //store uplaoded imageid
  const navigate = useNavigate();
  // Get available camera devices
  useEffect(() => {
    const getCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    };

    getCameraDevices();
  }, []);

  // Start the camera based on the selected camera type
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: cameraType, // Use front camera by default
            width: { ideal: 1280 }, // Set the video resolution
            height: { ideal: 720 },
          },
        };

        console.log("Requesting camera access...");

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Camera access granted.");
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setCameraError(
          "Unable to access the camera. Please ensure permissions are granted."
        );
      }
    };

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API is not supported by this browser.");
    } else {
      startCamera();
    }

    // Cleanup function to stop the camera when the component unmounts
    const videoElement = videoRef.current;
    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        console.log("Camera stream stopped.");
      }
    };
  }, [cameraType]);

  // Function to capture the image from the camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) {
      console.error("Error: Canvas or video reference not available.");
      return;
    }

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png"); // Convert image to Base64
    console.log("Captured image:", imageData);

    setCapturedImage(imageData);
    navigate("/");
  };

  // Memoize the getLocation function with useCallback
  const getLocation = useCallback(() => {
    if (!capturedImage) {
      console.error("Error: No image captured before sending to server.");
      setLocationError("Please capture an image before sending.");
      return;
    }

    if (navigator.geolocation) {
      console.log("Requesting location access...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted.");
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log(
            "Location:",
            position.coords.latitude,
            position.coords.longitude
          );

          setLocationError(null);

          // Now send the image and location data
          sendImageToServer(
            capturedImage,
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          window.alert(error);
          setLocationError("Please enable location services to proceed.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, [capturedImage]);

  // Run getLocation() only when capturedImage is set
  useEffect(() => {
    if (capturedImage) {
      console.log("Image successfully captured. Now requesting location...");
      getLocation();
    }
  }, [capturedImage, getLocation]);

  // Send the captured image and location to the server
  const sendImageToServer = async (imageUrl, latitude, longitude) => {
    const userId = "12345";
    const timestamp = new Date().toISOString();

    try {
      if (!imageUrl) {
        throw new Error("Invalid image: imageUrl is null or undefined.");
      }

      if (!imageUrl.includes(",")) {
        throw new Error("Invalid Base64 format: Missing ',' separator.");
      }

      // Extract Base64 data and MIME type
      const base64Data = imageUrl.split(",")[1];
      const mimeType = imageUrl.split(",")[0].split(":")[1].split(";")[0];

      // Convert Base64 to Blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: mimeType });

      // Convert Blob to File object
      const fileObject = new File([file], "image.jpg", { type: mimeType });

      // Prepare FormData
      const formData = new FormData();
      formData.append("image", fileObject); // Attach the file
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("userId", userId);
      formData.append("timestamp", timestamp);

      // Send data to backend
      const response = await api.post("user/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("✅ Image and location data uploaded successfully!");

        // **Store the imageId returned from the API**
        setImageId(response.data.imageId);
        return response.data;
      } else {
        console.error("❌ Failed to upload image and location data.");
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error.message);
    }
  };

  const toggleCamera = () => {
    setCameraType((prevType) => (prevType === "user" ? "environment" : "user"));
  };

  return (
    

    <section className="main camera-page">
    <div className="camera-space">
      {/* Live Camera Feed */}
      <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>

      {/* Camera Buttons */}
      <div className="camera-btn">
        <button onClick={captureImage} className="capture-button">
          Capture
        </button>
        <button onClick={toggleCamera} className="switch-camera-button">
          <img src="./images/switch-camera.png" alt="Switch Camera" />
        </button>
       
      </div>
      
      

      {/* Hidden Canvas for Capturing Image */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {/* Image Upload Status */}
      {imageId && <p>✅ Image Uploaded Successfully! Image ID: {imageId}</p>}

      {/* Display Captured Image */}
      {capturedImage && (
        <div className="captured-image">
          <img src={capturedImage} alt="Captured" />
          <a href={capturedImage} download="captured-image.png" className="download-button">
            Download Image
          </a>
        </div>
      )}

      {/* Display User Location */}
      {location.latitude && location.longitude && (
        <p>Location: {location.latitude}, {location.longitude}</p>
      )}

      {/* Display Available Camera Devices */}
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>{device.label || "Unnamed Camera"}</li>
        ))}
      </ul>

      {/* Error Messages */}
      {cameraError && <p className="error-message">{cameraError}</p>}
      {locationError && <p className="error-message">{locationError}</p>}
    </div>
  </section>

  );
};

export default CameraPage;
