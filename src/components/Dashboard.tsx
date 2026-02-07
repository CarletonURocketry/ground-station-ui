/*



HOLY VIBECODE!!

CLEAN ALL THIS SHIT UP


*/

import { useMemo, useRef, useCallback, useEffect } from "react";
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
import { useTelemetryStore } from "../store/telemetryStore";
import { cn } from "@/lib/utils";
import { StatsForNerds } from "./StatsForNerds";
import { useAppStore } from "@/store/appStore";

// Path to your 3D rocket model (place .glb or .gltf file in public folder)
const ROCKET_MODEL_URL = "/rocket.glb";

const LAUNCH_LAT = 47.98701492723335;
const LAUNCH_LON = -81.84848442698328;

export const Dashboard = () => {
  const viewerRef = useRef<CesiumViewer | null>(null);
  const rocketEntityRef = useRef<CesiumEntity | null>(null);
  const { currentState, isStatsOpen } = useAppStore();

  // Get telemetry data from Zustand store
  const { data } = useTelemetryStore();

  // Derive current telemetry values from store
  const telemetry = useMemo(() => {
    const altitude = data.altitude_sea_level.metres.at(-1) ?? 0;
    const temperature = data.temperature.celsius.at(-1) ?? 20;
    const pressure = data.pressure.pascals.at(-1) ?? 101325;
    const lat = data.gnss.latitude.at(-1) ?? LAUNCH_LAT;
    const lon = data.gnss.longitude.at(-1) ?? LAUNCH_LON;
    const missionTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;
    const acceleration = data.linear_acceleration.magnitude.at(-1) ?? 0;
    const statusCode = data.flight_status.status_code.at(-1) ?? 0;

    // Map status code to phase name (adjust mapping as needed)
    const phaseMap: Record<number, string> = {
      0: "PRE-LAUNCH",
      1: "IGNITION",
      2: "POWERED ASCENT",
      3: "COASTING",
      4: "APOGEE",
      5: "DESCENT",
      6: "LANDED",
    };
    const phase = phaseMap[statusCode] ?? "UNKNOWN";

    // Calculate velocity from acceleration history (simplified)
    // In reality you might want to store velocity separately or compute from altitude changes
    const velocity = 0; // Would need velocity data or integration

    return {
      altitude,
      velocity,
      acceleration,
      temperature,
      pressure: pressure / 1000, // Convert Pa to kPa for display
      lat,
      lon,
      missionTime,
      phase,
      // Default orientation - could be computed from angular velocity/magnetic field
      pitch: 90,
      heading: 0,
      roll: 0,
    };
  }, [data]);

  // Build flight path history from all GNSS data
  const flightHistory = useMemo(() => {
    const history: Cartesian3[] = [
      Cartesian3.fromDegrees(LAUNCH_LON, LAUNCH_LAT, 0),
    ];

    // Combine GNSS and altitude data to build path
    const { latitude, longitude } = data.gnss;
    const { metres } = data.altitude_sea_level;

    for (let i = 0; i < latitude.length; i++) {
      const lat = latitude[i];
      const lon = longitude[i];
      const alt = metres[i] ?? 0;
      if (lat !== undefined && lon !== undefined) {
        history.push(Cartesian3.fromDegrees(lon, lat, alt));
      }
    }

    return history;
  }, [data.gnss, data.altitude_sea_level]);

  const rocketPosition = useMemo(
    () =>
      Cartesian3.fromDegrees(telemetry.lon, telemetry.lat, telemetry.altitude),
    [telemetry.lat, telemetry.lon, telemetry.altitude]
  );

  // Calculate rocket orientation (heading, pitch, roll)
  const rocketOrientation = useMemo(() => {
    const hpr = new HeadingPitchRoll(
      CesiumMath.toRadians(telemetry.heading),
      CesiumMath.toRadians(telemetry.pitch - 90),
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



  return (
    <div
      className={cn(
        "flex-1 relative h-full bg-white rounded-lg border flex flex-col overflow-hidden",
        currentState === "recording" && "outline-4 outline-recording border-0",
        currentState === "replay" && "outline-4 outline-primary border-0"
      )}
    >
      {isStatsOpen && <StatsForNerds />}

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
      {currentState === "replay" && (
        <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <MissionPlayControls />
        </div>
      )}
    </div>
  );
};
