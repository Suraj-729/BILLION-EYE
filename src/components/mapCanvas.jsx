// MapCanvas.js
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function MapCanvas({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDvcjPnTtV0vF8A43Ofwgp4oLtUeJXs8Mo", // Replace with your API key
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
