import React, {useEffect, useState} from 'react';
import "./LocMap.css";


//Leaflet libraries
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import L from "leaflet"; 

//Offline Leaflet libraries
import "leaflet.offline";
import "./TileLayerOffline";
import "./ControlSaveTiles";

// Hooks
import { useStorage } from "../../hooks/useStorage";

//Creates the map componenet 
function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter());
  return null;
}

//Makes the offline component
function Offline(){
  const map = useMap()
  const  [progress,setProgress] = useState(0);
  const [total, setTotal]  = useState(0);

  useEffect(() => {
    if(map){
      // @ts-ignore
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abc",
          minZoom: 13,
          maxZoom: 16
        }
      );
  
      tileLayerOffline.addTo(map);
  
      const controlSaveTiles = L.control.savetiles(tileLayerOffline, {
          zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
          confirm(layer, succescallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
              succescallback();
            }
          },
          confirmRemoval(layer, successCallback) {
            // eslint-disable-next-line no-alert
            if (window.confirm("Remove all the tiles?")) {
              successCallback();
            }
          },
          saveText:
            '<i class="fas fa-download" aria-hidden="true" title="Save tiles"></i>',
          rmText:
            '<i class="fas fa-trash" aria-hidden="true"  title="Remove tiles"></i>'
        });
  
        controlSaveTiles.addTo(map);
  
        let progress;
        tileLayerOffline.on("savestart", (e) => {
          progress = 0;
          setTotal(e._tilesforSave.length);
        });
        tileLayerOffline.on("savetileend", () => {
          progress += 1;
          setProgress(progress);
        });
      }

  }, [map]);
  console.log("Progress:", progress);
  console.log("Total:", total);
  return null;
}


const RecenterAutomatically = ({lat,lng}) => {
  const map = useMap();
   useEffect(() => {
     map.setView([lat, lng]);
   }, [lat, lng]);
   return null;
 }

export default function LocMap(){

  var x_pos=10;
  var y_pos=10;

  // Functions for fetching x and y points
  const get_x = (data) => {
    return data.map((packet) => packet.gnss.position.latitude);
  };
  
  const get_y = (data) => {
    return data.map((packet) => packet.gnss.position.longitude);
  };
  
  const [x, y] = useStorage(get_x, get_y); // Get updated x and y

  if(x[x.length-1] != null && y[y.length-1] != null){
    x_pos=x[x.length - 1];
    y_pos = y[y.length - 1];
  }

    
  return(
    <MapContainer center={[x_pos,y_pos]} zoom={13} >
          <MyComponent/>
            <Offline/>
            {<TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> }
            <Marker position={[x_pos,y_pos]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>Location of the rocket 
                    Lat: {x_pos}  
                    Long: {y_pos} 
                </Popup>
            </Marker>
            <RecenterAutomatically lat={x_pos} lng={y_pos}/>
    </MapContainer>
  );
}
