import React, { useState } from "react";
import api from "../api";

const GoMapsTest = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleGeocode = async () => {
    const API_KEY = "AlzaSygeJQsa9OEFdqcKgE6PN78BAO8yG07P8Lk"; // Replace with your actual GoMaps Pro API Key
    const url = `https://gomapspro.com/api/reverse?lat=${latitude}&lng=${longitude}&key=${API_KEY}`;

    try {
      const response = await api.get(url);
      if (response.data && response.data.address) {
        setAddress(response.data.address);
        setError("");
      } else {
        setAddress("");
        setError("No address found.");
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      setError("Failed to fetch address.");
    }
  };

  return (
    <div>
      <h2>GoMaps Pro API Test</h2>
      <input
        type="text"
        placeholder="Enter Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={handleGeocode}>Get Address</button>
      {address && <p><b>Address:</b> {address}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GoMapsTest;
