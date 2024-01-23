import { useState } from 'react';
import { useKey } from "../../hooks/useKey";
import Popup from "reactjs-popup"
import ReplayItem from "./ReplayItem";
import "./ReplayPopup.css";

export default function ReplayPopup({status, websocketRef}) {
    console.log(status)
    // Setup list of replays
    let replays = <></>;
    if(status.mission_list != undefined) {
        replays = status.mission_list.map((mission) => (
        <ReplayItem name={mission.name} key={mission.key} websocketRef={websocketRef} />
        ));
    }
    // Check if we are currently playing the replay and set the button color accordingly
    let buttonState = status.status == 1 ? 'playing' : 'stopped';
    
    // Get the status icon for the replay status
    let buttonText = "Replay ";
    if (status.status == 1) {
        // Playing
        buttonText += "\u23F5";
    } else {
        // Stopped / Finished / No Replay Loaded
        buttonText += "\u23F9";
    }

    // Setup open state to have keybind
    const [open, setOpen] = useState(false);
    useKey("KeyR", "shift", () => {setOpen(!open)});
    return (
        <div>
            <p className="replay-button" id={buttonState} onClick={() => {setOpen(!open)}}>{buttonText}</p>
            <Popup open={open} position="center center" modal>
                <div className="replay-popup">
                    <div className="replay-popup-titlebar">
                        <h2>Replays</h2>
                        <button onClick={() => {setOpen(!open)}}>&times;</button>
                    </div>
                    <hr />
                    <div className="replay-popup-replaylist">
                        {replays}
                    </div>
                </div>
            </Popup>
        </div>
    );
}