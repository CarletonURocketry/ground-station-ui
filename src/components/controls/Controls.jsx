import React from "react";
import "./Controls.css";
import {useState} from "react";


export default function Controls({websocketRef}){

    const [speed, setSpeed] = useState(1); // Normal speed by default

    const fast_forward = (event) => {
        if (speed <6){
            setSpeed((prevSpeed) => prevSpeed * 2);
        }
        websocketRef.current.send(`telemetry replay speed ${speed}`)
        console.log(speed);
    };

    const slow_forward = (event) => {
        setSpeed((prevSpeed) => prevSpeed / 2);
        websocketRef.current.send(`telemetry replay speed ${speed}`)
    };

    const play = (event) => {
        websocketRef.current.send(`telemetry replay play`);
    };

    const pause = (event) => {
        websocketRef.current.send(`telemetry replay pause`);
    };


    return(
        
        <div className="buttons">
        <img
        src={require("../../assets/backward_button.png")}
        alt="backward"
        onClick={slow_forward}
        className="backward"
        />

        <img
        src={require("../../assets/play_button.png")}
        alt="play"
        onClick={play}
        className="play"
        />

        <img
        src={require("../../assets/pause_button.png")}
        alt="pause"
        onClick={pause}
        className="pause"
        />

        <img
        src={require("../../assets/foward_button.png")}
        alt="foward"
        onClick={fast_forward}
        className="foward"
        />

        </div>
       
    );
    
}
