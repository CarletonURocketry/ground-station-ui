import React from "react";
import { useStorage } from "../../hooks/useStorage";
import "./GNSSMeta.css";

export default function GNSSMeta({ className }) {
  const get_metadata = (data) => {
    return data.gnss_meta[0];
  };

  const do_nothing = (data) => {
    return;
  };

  const [metadata, y] = useStorage(get_metadata, do_nothing);
  console.log(metadata);
  const num_glonass = metadata.glonass_sats_in_use
    ? metadata.glonass_sats_in_use.length
    : "Unknown";
  const num_gps = metadata.glonass_sats_in_use
    ? metadata.glonass_sats_in_use.length
    : "Unknown";

  return (
    <div className={className}>
      <div className="metadata">
        <h4>GNSS Metadata</h4>
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
  );
}
