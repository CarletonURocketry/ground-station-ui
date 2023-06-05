import React from "react";
import "./Map.css";

import { useStorage } from "../hooks/useStorage";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

/**
 * Map component
 * @author Eshan Betrabet <eshanbetrabet@gmail.com>
 * @returns a map
 **/

// Components
const MapComponent = ({ className }) => {
  const [map, setMap] = useState(null);

  const get_mapdata = (data) => {
    return data.gnss[0];
  };

  // TODO DOCUMENT HOW THIS WORKS PLEASE :)
  const gnss = useStorage(get_mapdata);

  const gnss_longitude = gnss.position ? gnss.position.longitude : 0;

  const gnss_latitude = gnss.position ? gnss.position.latitude : 0;

  // this is the rocket Icon
  const iss = new Icon({
    iconUrl: "/images/rocket.jpg",
    iconSize: [25, 25],
  });

  map?.setView([parseFloat(gnss_latitude), parseFloat(gnss_longitude)]);

  // Returns a map component
  return (
    <>
      <div style={style.main_wrapper}>
        <MapContainer
          style={style.map_wrapper}
          center={[34.519939, -105.870087]}
          zoom={7}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          <Marker position={[gnss_latitude, gnss_longitude]} icon={iss}>
            <Popup>💀</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

// TODO: Move to Map.css
const style = {
  main_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "99vw",
    height: "100vh",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "#26282d",
    color: "white",
  },
  map_wrapper: {
    width: "80%",
    height: "80%",
  },
  button: {
    cursor: "pointer",
    width: "60%",
    margin: 20,
    height: "3rem",
    fontSize: "1rem",
    fontWeight: "bold",
    backgroundColor: "#000000",
    borderRadius: "5px",
    color: "white",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    borderLeft: "none",
  },
};

// Map Pages
export default function Map() {
  return (
    <main id="map">
      <MapComponent />
    </main>
  );
}
