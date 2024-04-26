import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function MapView() {
  const [geojsonData, setGeojsonData] = React.useState(null);
  
  useEffect(() => {
    fetch("http://localhost:5000/geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);
      });
  }, []);

  return (
    <div
      style={{
        
        height: "400px",
        marginLeft: "5rem",
        marginRight: "5rem",
        position: "relative",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <MapContainer center={[6.227397, -75.57933]} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geojsonData} />
      </MapContainer>
    </div>
  );
};

export default MapView;
