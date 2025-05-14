
// MapCanvas.js


// MapCanvas.js
import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

// ✅ FIX: move libraries outside the component
const libraries = ['marker'];

function MapCanvas({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1r7v2X0xk4bq3g5c6j8z9l1Z5Y2Qe4wE", // Replace with your API key
    libraries,
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && coordinates && mapRef.current) {
      if (markerRef.current) {
        markerRef.current.map = null;
      }

      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        position: coordinates,
        map: mapRef.current,
        title: "Advanced Marker",
      });
    }
  }, [isLoaded, coordinates]);

  return isLoaded && coordinates ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={15}
      onLoad={(map) => (mapRef.current = map)}
    />
  ) : null;
}

export default MapCanvas;
