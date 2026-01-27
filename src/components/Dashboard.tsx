/*



HOLY VIBECODE!!

CLEAN ALL THIS SHIT UP


*/

// TODO: ADD ZUSTAND FOR RECORDING/REPLAY STATE MANAGEMENT

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Viewer,
  Entity,
  PointGraphics,
  PolylineGraphics,
  ModelGraphics,
} from "resium";
import {
  Cartesian3,
  Color,
  Transforms,
  HeadingPitchRoll,
  Math as CesiumMath,
  Viewer as CesiumViewer,
  Entity as CesiumEntity,
} from "cesium";
import MissionPlayControls from "./MissionPlayControls";

// Path to your 3D rocket model (place .glb or .gltf file in public folder)
const ROCKET_MODEL_URL = "/rocket.glb";

const LAUNCH_LAT = 45.3876;
const LAUNCH_LON = -75.6972;
const MAX_ALTITUDE = 3000; // meters
const ASCENT_DURATION = 60; // seconds to reach max altitude

interface TelemetryData {
  altitude: number;
  velocity: number;
  acceleration: number;
  temperature: number;
  pressure: number;
  lat: number;
  lon: number;
  missionTime: number;
  phase: string;
  // Orientation angles (in degrees)
  pitch: number;
  heading: number;
  roll: number;
}

export const Dashboard = () => {
  const viewerRef = useRef<CesiumViewer | null>(null);
  const rocketEntityRef = useRef<CesiumEntity | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    altitude: 0,
    velocity: 0,
    acceleration: 0,
    temperature: 20,
    pressure: 101.325,
    lat: LAUNCH_LAT,
    lon: LAUNCH_LON,
    missionTime: 0,
    phase: "PRE-LAUNCH",
    pitch: 90, // Start pointing straight up
    heading: 0,
    roll: 0,
  });

  const [flightHistory, setFlightHistory] = useState<Cartesian3[]>([
    Cartesian3.fromDegrees(LAUNCH_LON, LAUNCH_LAT, 0),
  ]);

  // Simulate ascending rocket telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const newTime = prev.missionTime + 0.1;
        const progress = Math.min(newTime / ASCENT_DURATION, 1);

        // Simulate ascent trajectory (parabolic-ish)
        const altitudeProgress = Math.sin(progress * Math.PI * 0.5); // ease-out curve
        const newAltitude = altitudeProgress * MAX_ALTITUDE;

        // Velocity peaks mid-flight then decreases
        const velocityMultiplier = Math.cos(progress * Math.PI * 0.5);
        const newVelocity = velocityMultiplier * 350 + (1 - progress) * 50;

        // Acceleration decreases over time
        const newAcceleration = Math.max(0, 40 - progress * 45);

        // Temperature drops with altitude (lapse rate ~6.5°C per 1000m)
        const newTemperature = 20 - (newAltitude / 1000) * 6.5;

        // Pressure drops exponentially with altitude
        const newPressure = 101.325 * Math.exp(-newAltitude / 8500);

        // Slight drift in position during ascent
        const drift = Math.sin(newTime * 0.5) * 0.0005;
        const newLat = LAUNCH_LAT + progress * 0.002 + drift;
        const newLon = LAUNCH_LON + progress * 0.001;

        // Calculate rocket orientation based on flight phase
        // Pitch: 90° = pointing up, 0° = horizontal
        // During ascent, rocket tilts slightly in direction of travel
        const pitchFromVertical = Math.min(progress * 15, 10); // Max 10° tilt from vertical
        const newPitch = 90 - pitchFromVertical;

        // Heading based on direction of travel (towards northeast)
        const newHeading = 45 + Math.sin(newTime * 0.3) * 5; // Slight wobble

        // Roll oscillation (simulates spin stabilization)
        const newRoll = Math.sin(newTime * 2) * 3;

        // Determine flight phase
        let phase = "PRE-LAUNCH";
        if (newTime > 0 && newTime < 3) phase = "IGNITION";
        else if (newTime >= 3 && newTime < 10) phase = "POWERED ASCENT";
        else if (newTime >= 10 && newTime < 45) phase = "COASTING";
        else if (newTime >= 45 && progress < 1) phase = "APPROACHING APOGEE";
        else if (progress >= 1) phase = "APOGEE";

        return {
          altitude: newAltitude,
          velocity: Math.max(0, newVelocity),
          acceleration: newAcceleration,
          temperature: newTemperature,
          pressure: newPressure,
          lat: newLat,
          lon: newLon,
          missionTime: newTime,
          phase,
          pitch: newPitch,
          heading: newHeading,
          roll: newRoll,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update flight path history
  useEffect(() => {
    if (telemetry.missionTime > 0) {
      setFlightHistory((prev) => [
        ...prev,
        Cartesian3.fromDegrees(
          telemetry.lon,
          telemetry.lat,
          telemetry.altitude
        ),
      ]);
    }
  }, [
    Math.floor(telemetry.missionTime * 2),
    telemetry.altitude,
    telemetry.lat,
    telemetry.lon,
    telemetry.missionTime,
  ]);

  const rocketPosition = useMemo(
    () =>
      Cartesian3.fromDegrees(telemetry.lon, telemetry.lat, telemetry.altitude),
    [telemetry.lat, telemetry.lon, telemetry.altitude]
  );

  // Calculate rocket orientation (heading, pitch, roll)
  const rocketOrientation = useMemo(() => {
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(telemetry.heading),
      CesiumMath.toRadians(telemetry.pitch - 90), // Cesium pitch: 0 = horizontal, adjust from our 90 = up convention
      CesiumMath.toRadians(telemetry.roll)
    );
    return Transforms.headingPitchRollQuaternion(rocketPosition, hpr);
  }, [rocketPosition, telemetry.heading, telemetry.pitch, telemetry.roll]);

  const launchSitePosition = Cartesian3.fromDegrees(LAUNCH_LON, LAUNCH_LAT, 0);

  // Set up camera tracking when viewer is ready
  const handleViewerReady = useCallback((viewer: CesiumViewer) => {
    viewerRef.current = viewer;
  }, []);

  // Track the rocket entity
  useEffect(() => {
    if (viewerRef.current && rocketEntityRef.current) {
      viewerRef.current.trackedEntity = rocketEntityRef.current;
    }
  }, [telemetry.missionTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `T+${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="flex-1 relative h-full bg-white rounded-lg border flex flex-col overflow-hidden">
      {/* Live Telemetry Overlay - TODO - Put this in a ShadCN card */}
      <div className="absolute top-4 left-4 z-10 bg-white border shadow-lg p-5 rounded-xl font-mono min-w-[300px]">
        <div className="text-center text-xl font-black text-green-700 mb-3 tracking-wide">
          {telemetry.phase}
        </div>
        <div className="text-center text-2xl font-black text-blue-800 mb-4">
          {formatTime(telemetry.missionTime)}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base">
          <span className="font-bold text-gray-700">Altitude:</span>
          <span className="text-right font-black text-amber-700">
            {telemetry.altitude.toFixed(1)} m
          </span>
          <span className="font-bold text-gray-700">Velocity:</span>
          <span className="text-right font-black text-orange-700">
            {telemetry.velocity.toFixed(1)} m/s
          </span>
          <span className="font-bold text-gray-700">Acceleration:</span>
          <span className="text-right font-black text-red-700">
            {telemetry.acceleration.toFixed(1)} m/s²
          </span>
          <span className="font-bold text-gray-700">Latitude:</span>
          <span className="text-right font-black text-gray-900">
            {telemetry.lat.toFixed(6)}°
          </span>
          <span className="font-bold text-gray-700">Longitude:</span>
          <span className="text-right font-black text-gray-900">
            {telemetry.lon.toFixed(6)}°
          </span>
        </div>
      </div>

      {/* Tracking Toggle Button in the future */}
      <Viewer
        full
        timeline={false}
        animation={false}
        homeButton={false}
        baseLayerPicker={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        geocoder={false}
        fullscreenButton={false}
        vrButton={false}
        selectionIndicator={false}
        infoBox={false}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        ref={(ref) => {
          if (ref?.cesiumElement) {
            handleViewerReady(ref.cesiumElement);
          }
        }}
      >
        {/* Launch Site Marker */}
        <Entity
          position={launchSitePosition}
          name="Launch Site"
          description="Rocket Launch Site"
        >
          <PointGraphics pixelSize={12} color={Color.GREEN} />
        </Entity>

        {/* Current Rocket Position with 3D Model */}
        <Entity
          position={rocketPosition}
          orientation={rocketOrientation}
          name="Rocket"
          description="Current rocket position"
          ref={(ref) => {
            if (ref?.cesiumElement) {
              rocketEntityRef.current = ref.cesiumElement;
            }
          }}
        >
          {/* 3D Model - will load if file exists */}
          <ModelGraphics
            uri={ROCKET_MODEL_URL}
            minimumPixelSize={64}
            maximumScale={200}
            scale={10} // Adjust scale based on your model size
          />
          {/* Fallback point if model doesn't load */}
          <PointGraphics pixelSize={14} color={Color.RED} />
        </Entity>

        {/* Flight Path Trajectory */}
        {flightHistory.length > 1 && (
          <Entity name="Flight Path">
            <PolylineGraphics
              positions={flightHistory}
              width={3}
              material={Color.ORANGE}
            />
          </Entity>
        )}
      </Viewer>

      {/* Mission Play Controls Overlay */}
      <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <MissionPlayControls />
      </div>
    </div>
  );
};
