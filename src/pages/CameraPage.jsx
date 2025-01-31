// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import "../public/assets/css/CameraPage.css"; // Ensure you have a CSS file for styling

// const CameraPage = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startCamera();

//     return () => {
//       // Stop the camera when the component unmounts
//       if (videoRef.current && videoRef.current.srcObject) {
//         let tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
      
//       // Set canvas size to match video frame
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
      
//       // Draw the current video frame onto the canvas
//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
//       // Convert canvas content to image URL
//       const imageUrl = canvas.toDataURL("image/png");
//       setCapturedImage(imageUrl);
//     }
//   };

//   return (
//     <section className="main camera-page">
//       <div className="camera-space">
//         <div className="camera">
//           {/* Live Camera Feed */}
//           <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
//         </div>
//         <div className="camera-btn">
//           <button onClick={captureImage} className="capture-button">Capture</button>
//         </div>

//         {/* Canvas (Used for Capturing Image but kept hidden) */}
//         <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

//         {/* Show Captured Image */}
//         {capturedImage && (
//           <div className="captured-image">
//             <img src={capturedImage} alt="Captured" />
//             <a href={capturedImage} download="captured-image.png" className="download-button">
//               Download Image
//             </a>
//           </div>
//         )}

//         {/* Navigation Button */}
//         <div className="camera-btn">
//           <Link to="/HospitalDashboard" className="dashboard-button">Go to Dashboard</Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CameraPage;
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../public/assets/css/CameraPage.css"; // Ensure you have a CSS file for styling

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      const videoElement = videoRef.current;
      if (videoElement && videoElement.srcObject) {
        let tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      // Set canvas size to match video frame
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      // Draw the current video frame onto the canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas content to image URL
      const imageUrl = canvas.toDataURL("image/png");
      setCapturedImage(imageUrl);

      // Get user's location
      getLocation();
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
          // Once location is obtained, send data to the server
          sendImageToServer(capturedImage, position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLocationError("Please enable location services to proceed.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const sendImageToServer = async (imageUrl, latitude, longitude) => {
    const userId = "user123"; // Replace with actual user ID (e.g., from authentication context)

    // Convert base64 image to a Blob
    const blob = await fetch(imageUrl).then((res) => res.blob());

    // Create a FormData object to send the image and metadata
    const formData = new FormData();
    formData.append("image", blob, "captured-image.png");
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("userId", userId);

    try {
      const response = await fetch("https://your-backend-server.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image and location data uploaded successfully!");
      } else {
        console.error("Failed to upload image and location data.");
      }
    } catch (error) {
      console.error("Error uploading image and location data:", error);
    }
  };

  return (
    <section className="main camera-page">
      <div className="camera-space">
        <div className="camera">
          {/* Live Camera Feed */}
          <video ref={videoRef} autoPlay playsInline className="camera-feed"></video>
        </div>
        <div className="camera-btn">
          <button onClick={captureImage} className="capture-button">Capture</button>
        </div>

        {/* Canvas (Hidden, used for capturing image) */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        {/* Show Captured Image */}
        {capturedImage && (
          <div className="captured-image">
            <img src={capturedImage} alt="Captured" />
            <a href={capturedImage} download="captured-image.png" className="download-button">
              Download Image
            </a>
          </div>
        )}

        {/* Location Error Message */}
        {locationError && <p className="location-error">{locationError}</p>}

        {/* Navigation Button */}
        <div className="camera-btn">
          <Link to="/HospitalDashboard" className="dashboard-button">Go to Dashboard</Link>
        </div>
      </div>
    </section>
  );
};

export default CameraPage;