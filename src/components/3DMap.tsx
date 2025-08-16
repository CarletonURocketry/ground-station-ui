import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function DMap() {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(-74.5);
  const [lat] = useState(40);
  const [zoom] = useState(-1);
  // const [error, setError] = useState(null);

  // let protocol = new Protocol();
  // maplibregl.addProtocol("pmtiles", protocol.tile);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once and ensure container is not null

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLElement,
      style: {
        version: 8,
        sources: {
          // Optional background
          // pmtiles
          // osm: {
          //   type: "raster",
          //   tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
          //   tileSize: 256,
          //   attribution: "&copy; OpenStreetMap Contributors",
          //   maxzoom: 19,
          // },
          background: {
            type: "raster",
            tiles: ["http://localhost:8000/mapping_tiles/{z}/{x}/{y}.png"],
            tileSize: 256,
            minzoom: 0,
            maxzoom: 20,
          },
          terrainSource: {
            type: "raster-dem",
            tiles: ["http://localhost:8000/elevation_tiles/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          // Background layer - uncomment if you want an OSM background
          // {
          //   id: "osm",
          //   type: "raster",
          //   source: "osm",
          // },
          {
            id: "background-layer",
            type: "raster",
            source: "background",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
        terrain: {
          source: "terrainSource",
          exaggeration: 1.5,
        },
      },
      center: [lng, lat],
      zoom: -2,
    });

    map.current.setMaxBounds(null);

    // Add navigation control
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add error handling
    // map.current.on("error", (e) => {
    //   console.error("MapLibre error:", e.error);
    //   setError(`Map error: ${e.error.message}`);
    // });

    // Process source info after map loads
    map.current.on("load", async () => {
      console.log("Map loaded");
      if (map.current) {
        map.current.setMinZoom(0);
        map.current.setMaxZoom(20);
        // map.current.showTileBoundaries = true;

        new maplibregl.Marker().setLngLat([-75.6959, 45.3872]).addTo(map.current);
        new maplibregl.Marker().setLngLat([-81.3305, 48.4758]).addTo(map.current);
        new maplibregl.Marker().setLngLat([-81.8485, 47.9868]).addTo(map.current);
      }
    });

    // Cleanup function
    return () => {
      if (map.current){
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div className="map-container" style={{ marginBottom: "100px" }}>
      {/* {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>} */}
      <div ref={mapContainer} style={{ width: "1200px", height: "600px" }} />
    </div>
    
  );
}

export default DMap;