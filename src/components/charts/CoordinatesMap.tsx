import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";

const markerIcon = L.icon({ iconUrl: "marker-icon.png" });
const locations = new Map();
locations.set("spaceport_america", [32.989971496396876, -106.97527469166948] as LatLngExpression);
locations.set("launch_area", [32.94065936804605, -106.92205755550764] as LatLngExpression);
locations.set("carleton", [45.38717048880264, -75.6959313960035] as LatLngExpression);

interface CoordinatesMapProps {
  latitude: number;
  longitude: number;
}

function SnapToLocation({ val }: { val: string }) {
  const map = useMap();
  const location = locations.get(val) || [0,0] as LatLngExpression;
  map.setView(location, map.getZoom(), {
    animate: true,
  });
  return null;
}

function CoordinatesMap({ latitude, longitude }: CoordinatesMapProps) {
  const [coordinates, setCoordinates] = useState<[number, number][]>([
    [latitude, longitude],
  ]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("spaceport_america");
  const [currentMapTiles, setCurrentMapTiles] = useState("spaceport_america");

  useEffect(() => {
    setCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      [latitude, longitude],
    ]);
  }, [latitude, longitude]);

  return (
    <div style={{ height: "900px" }}>
      <p>
        Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}{" "}
        &nbsp;
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setIsTracking(!isTracking);
            }}
            checked={isTracking}
          />
          Track rocket
        </label>
        &nbsp;{" "}
        <select
          name="ports"
          id="ports"
          className="styled-select"
          onChange={(e) => {
            setCurrentLocation(e.target.value);
            setCurrentMapTiles(e.target.value === "launch_area" ? "spaceport_america" : e.target.value);
          }}
        >
          <option value="spaceport_america">Spaceport America</option>
          <option value="launch_area">Vertical Launch Area</option>
          <option value="carleton">Carleton</option>
        </select>
      </p>
      <MapContainer
        center={locations.get("spaceport_america")}
        zoom={15}
        maxZoom={15}
        scrollWheelZoom={false}
        style={{ height: "90vh" }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' should be USGS
          url={`http://localhost:8000/${currentMapTiles}/{z}/{x}/{y}.jpg`}
        />
        <Marker position={locations.get("spaceport_america")} icon={markerIcon}>
          <Popup>Spaceport America Office</Popup>
        </Marker>
        <Marker position={locations.get("launch_area")} icon={markerIcon}>
          <Popup>Spaceport America Vertical Launch Area</Popup>
        </Marker>
        <Marker position={locations.get("carleton")} icon={markerIcon}>
          <Popup>Carleton University</Popup>
        </Marker>
        <Polyline pathOptions={{ color: "red" }} positions={coordinates} />
        <SnapToLocation val={currentLocation} />
      </MapContainer>
    </div>
  );
}

export default CoordinatesMap;
