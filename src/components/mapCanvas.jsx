// MapCanvas.js
import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function MapCanvas({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD1r7v2X0xk4bq3g5c6j8z9l1Z5Y2Qe4wE", // Replace with your API key
    libraries: ['marker'], // Important: Load 'marker' library for AdvancedMarkerElement
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && coordinates && mapRef.current) {
      // Remove old marker if it exists
      if (markerRef.current) {
        markerRef.current.map = null;
      }

      // Create new AdvancedMarkerElement
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


