import React from "react";
import "./GNSSMeta.css";

// Hooks
import { useStorage } from "../../hooks/useStorage";

// Components
import Satellite from "./Satellite";

export default function GNSSMeta({ className }) {
  const get_metadata = (data) => {
    return data.gnss_meta[0];
  };

  const do_nothing = (data) => {
    return;
  };

  // Satellites in use
  const [metadata, y] = useStorage(get_metadata, do_nothing);

  const num_glonass = metadata.glonass_sats_in_use
    ? metadata.glonass_sats_in_use.length
    : "Unknown";
  const num_gps = metadata.glonass_sats_in_use
    ? metadata.glonass_sats_in_use.length
    : "Unknown";

  // Satellites in view
  const in_view = metadata
    ? "No satellites in view."
    : metadata.sats_in_view.map((sat) => (
        <Satellite
          type={sat.type}
          azimuth={sat.azimuth}
          snr={sat.snr}
          elevation={sat.elevation}
        />
      ));

  return (
    <div className={className + " gnss"}>
      <div className="metadata">
        <h4>Satellites in View</h4>
        <div className="in-view">{in_view}</div>
        <div className="in-use">
          <p>
            <strong>Glonass in use: </strong>
            {num_glonass}
          </p>
          <p>
            <strong>GPS in use: </strong>
            {num_gps}
          </p>
        </div>
      </div>
    </div>
  );
}
