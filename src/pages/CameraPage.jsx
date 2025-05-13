import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../public/assets/css/CameraPage.css"; // Ensure you have a CSS file for styling
import api from "../api";
import ExifReader from "exifreader";


const CameraPage = () => {
 
  const videoRef = useRef(null); // Reference for the video element
  const canvasRef = useRef(null); // Reference for the canvas element
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
  const [location, setLocation] = useState({ latitude: null, longitude: null }); // State to store user's location
  const [locationError, setLocationError] = useState(null); // State to store location errors
  const [cameraError, setCameraError] = useState(null); // State to store camera errors
  const [devices, setDevices] = useState([]); // State to store available camera devices
  // const [cameraType, setCameraType] = useState("user");
  const [imageId, setImageId] = useState(null); //store uplaoded imageid
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const [exifData, setExifData] = useState(null);

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
        const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

        const constraints = {
          video: {
            facingMode: { ideal: isMobile ? "environment" : "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };

        console.log("Requesting camera access...");
        // setLoading(true);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
         
          console.log("Camera access granted.");
        }
        // setLoading(false);
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
  }, []);

  // Function to capture the image from the camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) {
      console.error("Error: Canvas or video reference not available.");
      return;
    }

    const shutterSound = new Audio(
      "/billioneye/images/camera-shutter-6305.mp3"
    ); // Ensure the path is correct
    shutterSound
      .play()
      .catch((err) => console.error("Audio playback failed:", err));

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");

    const base64String = imageData.split(",")[1];

    console.log("Captured image:", base64String);

    extractExifMetadata(base64String);

    setCapturedImage(base64String);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setShowThankYou(true);

      // Step 2: Show "Thank You" message for another 3 seconds, then navigate
      setTimeout(() => {
        setShowThankYou(false);
        navigate("/");
      }, 3000);
    }, 3000);
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

  const sendImageToServer = async (base64String, latitude, longitude) => {
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.error("❌ Invalid location data. Latitude or Longitude is NaN.");
      alert("Failed to get valid location. Please enable GPS and try again.");
      return;
    }

    const userId = "12345";
    const timestamp = new Date().toISOString();

    try {
      if (!base64String) {
        throw new Error("Invalid image: base64String is null or undefined.");
      }

      // Prepare JSON payload
      const payload = {
        userId,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        timestamp,
        base64String, // Send Base64 directly
      };

      console.log("📤 Sending data to server:", payload);

      // Send data to backend
      console.log(window.location.origin, "api");
      console.log(api, "api call data");
      const response = await api.post("backend/user/upload-image", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        console.log("✅ Image and location data uploaded successfully!");
        setImageId(response.data.imageId);
      } else {
        alert("❌ Failed to upload image and location data.");
        console.error("❌ Failed to upload image and location data.");
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error.message);
    }
  };

  const extractExifMetadata = async (base64String) => {
    try {
      // Convert Base64 string to a binary format
      const binaryStr = atob(base64String);
      const len = binaryStr.length;
      const uint8Array = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        uint8Array[i] = binaryStr.charCodeAt(i);
      }

      // Use ExifReader to load metadata
      const tags = await ExifReader.load(uint8Array.buffer);

      console.log("📝 Parsed EXIF Data:", tags);
      setExifData({
        latitude: tags.GPSLatitude?.description || "Not available",
        longitude: tags.GPSLongitude?.description || "Not available",
        timestamp: tags.DateTimeOriginal?.description || "Not available",
        cameraModel: tags.Model?.description || "Not available",
        make: tags.Make?.description || "Not available",
      });
    } catch (error) {
      console.error("[extractExifMetadata] Error extracting EXIF data:", error);
    }
  };

  // const toggleCamera = () => {
  //   setCameraType((prevType) => (prevType === "user" ? "environment" : "user"));
  // };
  // if (loading) return <Loader />;
  return (
    <section className="main camera-page">
      <div className="camera-space">
        {/* Live Camera Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="camera-feed"
        ></video>

        {/* Camera Buttons */}
        <div className="camera-btn" style={{marginLeft:"29px"}}>
          <button onClick={captureImage} className="capture-button">
          
            Capture
          </button>
          {/* <button onClick={toggleCamera} className="switch-camera-button">
            <img
              src="/billioneye/images/switch-camera.png"
              alt="Switch Camera"
            />
          </button> */}
        </div>

        {/* Hidden Canvas for Capturing Image */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        {/* Image Upload Status */}
        {imageId && <p>✅ Image Uploaded Successfully! Image ID: {imageId}</p>}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <div className="checkmark">✔</div>
              <h2>Report Submitted</h2>
              <p>Your report has been successfully sent to the government.</p>
              <button
                onClick={() => setShowPopup(false)}
                className="popup-button"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        )}

        {/* Thank You Message */}
        {showThankYou && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank You for Reporting!</h2>
              <p>Your contribution helps make a better and safer society.</p>
            </div>
          </div>
        )}

        {/* Display User Location */}
        {location.latitude && location.longitude && (
          <p>
            Location {location.latitude}, {location.longitude}
          </p>
        )}

        {/* Display Available Camera Devices */}
        <ul>
          {devices.map((device) => (
            <li key={device.deviceId}>{device.label || "Unnamed Camera"}</li>
          ))}
        </ul>

        {/* Display EXIF Data */}

        {/* Error Messages */}
        {cameraError && <p className="error-message">{cameraError}</p>}
        {locationError && <p className="error-message">{locationError}</p>}

        {exifData && (
          <div>
            <h3>EXIF Data:</h3>
            <p>
              <strong>Latitude:</strong> {exifData.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {exifData.longitude}
            </p>
            <p>
              <strong>Timestamp:</strong> {exifData.timestamp}
            </p>
            <p>
              <strong>Camera Model:</strong> {exifData.cameraModel}
            </p>
            <p>
              <strong>Make:</strong> {exifData.make}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CameraPage;
