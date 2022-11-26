import React from "react";
import "./Controls.css";

import {useState} from "react";

// Components
//import MissionTimer from "./MissionTimer";

// Utils
import { clear_telemetry } from "../../utils/storage";

/*
telemetry replay speed <multiplier>
telemetry replay play <mission>
telemetry replay play
telemetry replay pause
telemetry replay stop 
*/


export default function Controls({websocketRef}){



    const [pause, setPause] = useState(false);
    const [play, setPlay] = useState(true);
    const [fast, setFast] = useState(false);
    const [slow, setSlow] = useState(false);


        


    function sentCommand(input){

        switch (input) {
            case "play":
                const command = (event) => {
                    websocketRef.current.send(`telemetry replay play`);
                }; 
                return command;
            
            case "pause":
                const command1 = (event) => {
                    websocketRef.current.send(`telemetry replay pause`);
                    clear_telemetry();
                }; 
                return command1;
            
            case "fast": 
                const command2 = (event) => {
                    websocketRef.current.send(`telemetry replay speed 10`);
                }; 
                return command2;
            
            case "slow":
                const command3 = (event) => {
                    websocketRef.current.send(`telemetry replay speed -10`);
                }; 
                return command3;
                

        }
    }

        

    return(
        
        <div className="buttons">

        <img
        src={require("../../assets/backward_button.png")}
        alt="backward"
        onClick={sentCommand("slow")}
        className="backward"
        />

        <img
        src={require("../../assets/play_button.png")}
        alt="play"
        onClick={sentCommand("play")}
        className="play"
        />

        <img
        src={require("../../assets/pause_button.png")}
        alt="pause"
        onClick={sentCommand("pause")}
        className="pause"
        />

        <img
        src={require("../../assets/foward_button.png")}
        alt="foward"
        onClick={sentCommand("fast")}
        className="foward"
        />

        

        





        </div>
       
    );
    
}
