import React from "react";

export default function Satellite({ type, azimuth, elevation, snr }) {
  return (
    <div className="satellite">
      <h5>{type}</h5>
      <p>
        <strong>Elevation: </strong>
        {elevation}
      </p>
      <p>
        <strong>Azimuth: </strong>
        {azimuth}
      </p>
      <p>
        <strong>SNR: </strong>
        {snr}
      </p>
    </div>
  );
}
