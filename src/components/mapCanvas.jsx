// MapCanvas.js
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function MapCanvas({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1r7v2X0xk4bq3g5c6j8z9l1Z5Y2Qe4wE" , // Replace with your API key
  });

  return isLoaded && coordinates ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  ) : null;
}

export default MapCanvas;
