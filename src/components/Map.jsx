import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-75.58807098263038, 6.246052900875014],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-75.57140772761306, 6.239482512440446],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-75.59396775286517, 6.224945068748966],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-75.57210192774596, 6.211202997326495],
        type: "Point",
      },
      id: 3,
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-75.58519202864677, 6.212804872151537],
        type: "Point",
      },
    },
  ],
};

const MapView = () => {
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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={geojsonData} />
      </MapContainer>
    </div>
  );
};

export default MapView;
