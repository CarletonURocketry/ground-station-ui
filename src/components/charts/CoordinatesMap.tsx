import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";

const markerIcon = L.icon({ iconUrl: "marker-icon.png" });

interface CoordinatesMapProps {
  latitude: number;
  longitude: number;
}

function CoordinatesMap({ latitude, longitude }: CoordinatesMapProps) {
  const spaceport_america = [
    32.989971496396876, -106.97527469166948,
  ] as LatLngExpression;
  const launch_area = [
    32.94065936804605, -106.92205755550764,
  ] as LatLngExpression;
  const [coordinates, setCoordinates] = useState<[number, number][]>([[latitude, longitude]]);

  useEffect(() => {
    setCoordinates(prevCoordinates => [...prevCoordinates, [latitude, longitude]]);
  }, [latitude, longitude]);



  return (
    <div style={{ height: "900px" }}>
      <p>
        Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}
      </p>
      <MapContainer
        center={spaceport_america}
        zoom={15}
        maxZoom={15}
        scrollWheelZoom={false}
        style={{ height: "90vh" }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' should be USGS
          url="http://localhost:8000/{z}/{x}/{y}.jpg"
        />
        <Marker position={spaceport_america} icon={markerIcon}>
          <Popup>Spaceport America Office</Popup>
        </Marker>
        <Marker position={launch_area} icon={markerIcon}>
          <Popup>Spaceport America Vertical Launch Area</Popup>
        </Marker>
        <Polyline pathOptions={{ color: "red" }} positions={coordinates} />
      </MapContainer>
    </div>
  );
}

export default CoordinatesMap;
