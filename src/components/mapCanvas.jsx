
// // MapCanvas.js


// // MapCanvas.js
// import React, { useEffect, useRef } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "300px",
// };

// // ✅ FIX: move libraries outside the component
// const libraries = ['marker'];

// function MapCanvas({ coordinates }) {
//   const { isLoaded } = useJsApiLoader({
//     //googleMapsApiKey: "AIzaSyD1r7v2X0xk4bq3g5c6j8z9l1Z5Y2Qe4wE",
//     googleMapsApiKey: "AIzaSyDvcjPnTtV0vF8A43Ofwgp4oLtUeJXs8Mo" // Replace with your API key  libraries,
//   });

//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (isLoaded && coordinates && mapRef.current) {
//       if (markerRef.current) {
//         markerRef.current.map = null;
//       }

//       markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
//         position: coordinates,
//         map: mapRef.current,
//         title: "Advanced Marker",
//       });
//     }
//   }, [isLoaded, coordinates]);

//   return isLoaded && coordinates ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={coordinates}
//       zoom={15}
//       onLoad={(map) => (mapRef.current = map)}
//     />
//   ) : null;
// }

// export default MapCanvas;


import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet default icon path (important in React apps)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper component to move and zoom the map
const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 17); // zoom in to level 17
    }
  }, [location, map]);

  return null;
};

const ZoomToLocationMap = ({ location }) => {
  return (
    <MapContainer
      center={[20.2961, 85.8245]} // Default center
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {location && (
        <>
          <FlyToLocation location={location} />
          <Marker position={location}>
            <Popup>Selected Location</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default ZoomToLocationMap;