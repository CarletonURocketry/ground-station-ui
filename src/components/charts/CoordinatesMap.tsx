// import { LatLngTuple } from "leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface CoordinatesMapProps {
  latitude: number;
  longitude: number;
}

function CoordinatesMap({ latitude, longitude }: CoordinatesMapProps) {
  const position = [45.3872, -75.6959] as LatLngExpression;
  return (
    <div style={{ height: "1000px" }}>
      <p>
        Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}
      </p>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default CoordinatesMap;
