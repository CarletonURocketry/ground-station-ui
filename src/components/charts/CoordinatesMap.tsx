import L, { LatLngExpression } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef, useMemo } from "react";

const markerIcon = L.icon({ iconUrl: "marker-icon.png" });
const locations = new Map();
locations.set("spaceport_america", [
  32.989971496396876, -106.97527469166948,
] as LatLngExpression);
locations.set("launch_area", [
  32.94065936804605, -106.92205755550764,
] as LatLngExpression);
locations.set("carleton", [
  45.38717048880264, -75.6959313960035,
] as LatLngExpression);

interface CoordinatesMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}
interface PolylineProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

function SnapToLocation({ val }: { val: string }) {
  const map = useMap();
  const location =
    locations.get(val) ||
    (locations.get("spaceport_america") as LatLngExpression);
  map.setView(location, map.getZoom(), {
    animate: true,
  });
  return null;
}

// Container that only rerenders polyline when coordinates change
const PolylineContainer = React.memo(
  ({ latitude, longitude }: PolylineProps) => {
    const coordinatesRef = useRef<[number, number][]>([]);

    useEffect(() => {
      if (latitude !== undefined && longitude !== undefined) {
        coordinatesRef.current = [
          ...coordinatesRef.current,
          [latitude, longitude],
        ];
      }
    }, [latitude, longitude]);

    const memoizedCoordinates = useMemo(
      () => coordinatesRef.current,
      [coordinatesRef.current]
    );

    return (
      <Polyline
        pathOptions={{ color: "#232db0", weight: 5 }}
        positions={memoizedCoordinates}
      />
    );
  }
);

const CoordinatesMap = ({ latitude, longitude }: CoordinatesMapProps) => {
  const [currentLocation, setCurrentLocation] = useState("spaceport_america");

  return (
    <div style={{ height: "1100px" }}>
      <p>
        Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}
        &nbsp;{" "}
        <select
          name="ports"
          id="ports"
          className="styled-select"
          onChange={(e) => {
            setCurrentLocation(e.target.value);
          }}
        >
          <option value="spaceport_america">Spaceport America</option>
          <option value="launch_area">Vertical Launch Area</option>
          <option value="carleton">Carleton</option>
        </select>
      </p>
      <MapContainer
        center={locations.get("spaceport_america")}
        zoom={16}
        maxZoom={16}
        minZoom={2}
        scrollWheelZoom={false}
        style={{ height: "92%" }}
      >
        <TileLayer url={`http://localhost:8000/{z}/{x}/{y}.png`} />
        <Marker position={locations.get("spaceport_america")} icon={markerIcon}>
          <Popup>Spaceport America Office</Popup>
        </Marker>
        <Marker position={locations.get("launch_area")} icon={markerIcon}>
          <Popup>Spaceport America Vertical Launch Area</Popup>
        </Marker>
        <Marker position={locations.get("carleton")} icon={markerIcon}>
          <Popup>Carleton University</Popup>
        </Marker>
        <PolylineContainer latitude={latitude} longitude={longitude} />
        <SnapToLocation val={currentLocation} />
      </MapContainer>
    </div>
  );
};

export default React.memo(CoordinatesMap);
