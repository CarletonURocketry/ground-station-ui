import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";

const markerIcon = L.icon({ iconUrl: "marker-icon.png" });
const spaceport_america = [
  32.989971496396876, -106.97527469166948,
] as LatLngExpression;
const launch_area = [
  32.94065936804605, -106.92205755550764,
] as LatLngExpression;

interface CoordinatesMapProps {
  latitude: number;
  longitude: number;
}

function SetViewOnClick({
  animateRef,
}: {
  animateRef: React.MutableRefObject<boolean>;
}) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

function CoordinatesMap({ latitude, longitude }: CoordinatesMapProps) {
  const animateRef = useRef(true);
  const [coordinates, setCoordinates] = useState<[number, number][]>([
    [latitude, longitude],
  ]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTiles, setCurrentTiles] = useState("http://localhost:8000/SAMapTiles2/{z}/{x}/{y}.jpg");

  useEffect(() => {
    setCoordinates((prevCoordinates) => [
      ...prevCoordinates,
      [latitude, longitude],
    ]);
    const map = document.querySelector(".leaflet-tile-pane") as HTMLElement;
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
            console.log(e.target.value);
            setCurrentTiles(`http://localhost:8000/${e.target.value}/{z}/{x}/{y}.jpg`);
          }}
        >
          <option value="SAMapTiles2">Spaceport America</option>
          <option value="Carleton">Carleton</option>
        </select>
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
          url={currentTiles}
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
