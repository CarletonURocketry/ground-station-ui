import React from "react";
import "./Controls.css";
import {useState} from "react";

//react components of svg files
import { ReactComponent as Play } from "../../assets/Play.svg";
import { ReactComponent as Pause } from "../../assets/Pause.svg";
import { ReactComponent as Forward } from "../../assets/Forward.svg";


export default function Controls({websocketRef}){

    const [speed, setSpeed] = useState(1); // Normal speed by default

    //Sends the speed command to fast forward 
    const fast_forward = (event) => {
        //sets the maximum speed to 6
        if (speed <4){
            setSpeed((prevSpeed) => prevSpeed * 2);
        }
        websocketRef.current.send(`telemetry replay speed ${speed}`)
    };

    //sends the speed command to slow forward
    const slow_forward = (event) => {
        //Decreases the current speed by a factor of 2
        if (speed >0.25){
            setSpeed((prevSpeed) => prevSpeed / 2);
        }
        websocketRef.current.send(`telemetry replay speed ${speed}`)
    };

    //sends the play command
    const play = (event) => {
        websocketRef.current.send(`telemetry replay play`);
    };

    //send the pause command
    const pause = (event) => {
        websocketRef.current.send(`telemetry replay pause`);
    };

    return(
        
        <div className="buttons">
    
        <Forward id = "backward"
        onClick={slow_forward}
        />

        <Play id = "play"
        onClick={play}
        />

        <Pause id = "pause"
        onClick={pause}
        />

        <Forward id = "forward"
        onClick={fast_forward}
        />

        </div> 
    );
    
}
