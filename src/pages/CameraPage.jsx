import React, { useEffect, useRef, useState } from "react";
import "../public/assets/css/CameraPage.css"; // Ensure you have a CSS file for styling
import api from "../api";
const CameraPage = () => {
  const videoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null); // Reference for the canvas element
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
  const [location, setLocation] = useState({ latitude: null, longitude: null }); // State to store user's location
  const [locationError, setLocationError] = useState(null); // State to store location errors
  const [cameraError, setCameraError] = useState(null); // State to store camera errors
  const [cameraType, setCameraType] = useState("environment"); // State to manage camera type (front or back)
  const [devices, setDevices] = useState([]); // State to store available camera devices

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
            facingMode: cameraType, // Use the selected camera type
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

    // Check if the browser supports the camera API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera API is not supported by this browser.");
    } else {
      startCamera();
    }

    // Store the current videoRef value in a variable
    const videoElement = videoRef.current;

    // Cleanup function to stop the camera when the component unmounts
    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        console.log("Camera stream stopped.");
      }
    };
  }, [cameraType]); // Restart camera when cameraType changes


  // Capture an image from the video stream
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to match the video frame
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert canvas content to an image URL
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);
      console.log(imageUrl);
      
      // Get the user's location after capturing the image
      getLocation();
    }
  };
  
  

  // Get the user's location using the Geolocation API
  const getLocation = () => {
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

          // Send the captured image and location data to the server
          sendImageToServer(
            capturedImage,
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Please enable location services to proceed.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]); // Remove the prefix (data:image/png;base64,)
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/png" });
};
const sendImageToServer = async (imageUrl, latitude, longitude) => {
  const userId = "12345"; // Replace with actual user ID (e.g., from authentication context)
  const timestamp = new Date().toISOString();

  try {
      // Convert the base64 image to a Blob
      const blob = base64ToBlob(imageUrl);

      // Create a FormData object to send the image and metadata
      const formData = new FormData();
      formData.append("image", blob, "captured-image.png");
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("userId", userId);
      formData.append("timestamp", timestamp);

      // Send the data to the backend API
      const response = await api.post("/user/save-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
          console.log("Image and location data uploaded successfully!");
      } else {
          console.error("Failed to upload image and location data.");
      }
  } catch (error) {
      console.error("Error uploading image and location data:", error);
  }
};
  // Switch between front and back cameras
  const switchCamera = () => {
    setCameraType((prevType) =>
      prevType === "environment" ? "user" : "environment"
    );
  };


  
  

  return (
    <section className="main camera-page">
      <div className="camera-space">
        <div className="camera">
          {/* Live Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-feed"
          ></video>
        </div>
        <div className="camera-btn">
          <button onClick={captureImage} className="capture-button">
            Capture
          </button>
          <button onClick={switchCamera} className="switch-camera-button">
            <img src="./images/switch-camera.png" alt="Switch Camera" />
          </button>
        </div>

        {/* Canvas (Hidden, used for capturing image) */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        {/* Show Captured Image */}
        {capturedImage && (
          <div className="captured-image">
            <img src={capturedImage} alt="Captured" />
            <a
              href={capturedImage}
              download="captured-image.png"
              className="download-button"
            >
              Download Image
            </a>
          </div>
        )}
        {location.latitude && location.longitude && (
          <p>
            Location: {location.latitude}, {location.longitude}
          </p>
        )}

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
