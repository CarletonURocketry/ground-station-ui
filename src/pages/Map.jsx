import React from "react";
import "./Map.css";


// Components
import LocMap from "../components/map-loc/LocMap";

export default function Map(){
    return(
    <main>
        <h1>Location of Rocket</h1>
        <LocMap className="rocket-map" />
    </main>
    );
}