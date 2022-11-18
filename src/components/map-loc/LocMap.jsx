import React, {useEffect, useState} from 'react';
import "./LocMap.css";


//Leaflet libraries
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import L from "leaflet"; 

//Importing local forage which is a local storage JS library 
import localforage from 'localforage';

// Hooks
import { useStorage } from "../../hooks/useStorage";
import { removeTile } from 'leaflet.offline';

//Creates the map componenet 
function MyComponent() {
  const map = useMap()
  console.log('map center:', map.getCenter());//console the lat & long
  return null;
}


function ComponentDidMount() {
  //Defining the offline layer for the map
    const map = useMap();
    const offlineLayer = L.tileLayer.offline('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', localforage, {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abc',
    minZoom: 13,
    maxZoom: 19,
    crossOrigin: true
});
    offlineLayer.addTo(map);//add the offline layer
}


//it recenters automatically if the lat and long changes 
const RecenterAutomatically = ({lat,lng}) => {
  const map = useMap();
   useEffect(() => {
     map.setView([lat, lng]);
   }, [lat, lng]);
   return null;
 }

export default function LocMap(){

  //set a default x_pos & y_pos when the WebSocket is not connected
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

  //Takes the last element of the 10 element x & y array given by the WebSocket and ensures it is not null
  if(x[x.length-1] != null && y[y.length-1] != null){
    x_pos=x[x.length - 1];
    y_pos = y[y.length - 1];
  }

  //Returns map cotainer with a center and zoom level by layering the tiles using the library
  //Returns a marker at the lat and long also a pop up that shows it 
  return(
    <MapContainer center={[x_pos,y_pos]} zoom={13} >
          <MyComponent/>
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
