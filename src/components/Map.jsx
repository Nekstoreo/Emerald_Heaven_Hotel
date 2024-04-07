import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
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
    <MapContainer
      center={[6.227397,-75.579330]}
      zoom={14}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geojsonData} />
    </MapContainer>
  );
};

export default MapView;
