import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { Sphere, ScreenSizer } from "@react-three/drei";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useControls } from "leva";

// Define location interface
interface Location {
  latitude: number;
  longitude: number;
}

// Define locations using a regular object instead of Map
const locations: Record<string, Location> = {
  spaceport_america: {
    latitude: 32.989971496396876,
    longitude: -106.97527469166948,
  },
  launch_area: {
    latitude: 32.94065936804605,
    longitude: -106.92205755550764,
  },
  carleton: {
    latitude: 45.38717048880264,
    longitude: -75.6959313960035,
  },
};

interface CoordinatesMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const CoordinatesMap = ({ latitude, longitude }: CoordinatesMapProps) => {
  const [currentLocation, setCurrentLocation] =
    useState<string>("spaceport_america");

  const values = useControls({
    altitude: {
      value: 0,
      min: 0,
      max: 10000,
      step: 1,
      label: "Altitude (m)",
    },
    sphereSize: {
      value: 5,
      min: 0.1,
      max: 100,
      step: 0.1,
      label: "Sphere Size (m)",
    },
  });

  const currentCoords = locations[currentLocation];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 1, padding: "10px" }}>
        <p>
          Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}{" "}
          <select
            name="ports"
            id="ports"
            className="styled-select"
            onChange={(e) => setCurrentLocation(e.target.value)}
          >
            <option value="spaceport_america">Spaceport America</option>
            <option value="launch_area">Vertical Launch Area</option>
            <option value="carleton">Carleton</option>
          </select>
        </p>
      </div>

      <Map
        initialViewState={{
          latitude: currentCoords.latitude,
          longitude: currentCoords.longitude,
          zoom: 18,
          pitch: 60,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap Contributors",
              maxzoom: 19,
            },
            terrainSource: {
              type: "raster-dem",
              tiles: [
                "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors, AWS",
            },
            hillshadeSource: {
              type: "raster-dem",
              url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
            },
            {
              id: "hillshade",
              type: "hillshade",
              source: "terrainSource",
              paint: {
                "hillshade-shadow-color": "#CDAA6D",
                "hillshade-exaggeration": 0.25,
              },
            },
            {
              id: "hills",
              type: "hillshade",
              source: "hillshadeSource",
              layout: { visibility: "visible" },
              paint: {
                "hillshade-shadow-color": "#473B24",
                "hillshade-exaggeration": 1,
              },
            },
          ],
          terrain: {
            source: "terrainSource",
            exaggeration: 0.1,
          },
        }}
      >
        <Canvas
          latitude={currentCoords.latitude}
          longitude={currentCoords.longitude}
        >
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
          />
          <ScreenSizer position={[0, values.altitude, 0]} scale={1}>
            <Sphere args={[values.sphereSize / 2]} material-color="orange" />
          </ScreenSizer>
          <axesHelper args={[10]} />
        </Canvas>
      </Map>
    </div>
  );
};

export default React.memo(CoordinatesMap);

// const CoordinatesMap = ({ latitude, longitude }: CoordinatesMapProps) => {
//   const [currentLocation, setCurrentLocation] = useState("spaceport_america");

//   return (
//     <div style={{ height: "1100px", paddingLeft: "10px", paddingRight: "10px" }}>
//       <p>
//         Latitude: {latitude || "No data"}, Longitude: {longitude || "No data"}
//         &nbsp;{" "}
//         <select
//           name="ports"
//           id="ports"
//           className="styled-select"
//           onChange={(e) => {
//             locChanged = true
//             setCurrentLocation(e.target.value);
//           }}
//         >
//           <option value="spaceport_america">Spaceport America</option>
//           <option value="launch_area">Vertical Launch Area</option>
//           <option value="carleton">Carleton</option>
//         </select>
//       </p>
//       <MapContainer
//         center={locations.get("spaceport_america")}
//         zoom={16}
//         maxZoom={20}
//         minZoom={0}
//         scrollWheelZoom={false}
//         style={{ height: "92%" }}
//       >
//         <TileLayer maxZoom={20} url={`http://localhost:8000/{z}/{x}/{y}.png`} />
//         <Marker position={locations.get("spaceport_america")} icon={markerIcon}>
//           <Popup>Spaceport America Office</Popup>
//         </Marker>
//         <Marker position={locations.get("launch_area")} icon={markerIcon}>
//           <Popup>Spaceport America Vertical Launch Area</Popup>
//         </Marker>
//         <Marker position={locations.get("carleton")} icon={markerIcon}>
//           <Popup>Carleton University</Popup>
//         </Marker>
//         <PolylineContainer latitude={latitude} longitude={longitude} />
//         <SnapToLocation val={currentLocation} />
//       </MapContainer>
//     </div>
//   );
// };

// export default React.memo(CoordinatesMap);
