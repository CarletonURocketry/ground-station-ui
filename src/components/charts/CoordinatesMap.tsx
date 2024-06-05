import React, { useState, useEffect } from 'react';

interface CoordinatesMapProps {
  latitude: number;
  longitude: number;
}

function CoordinatesMap({latitude, longitude}: CoordinatesMapProps){
  return (
    <div>
      <p>
        Latitude: {latitude || "No data"}, 
        Longitude: {longitude || "No data"}
      </p>
    </div>
  );
}