import { useMemo, useRef, useCallback, useEffect } from "react";
import {
  Viewer,
  Entity,
  PointGraphics,
  PolylineGraphics,
} from "resium";
import {
  Cartesian3,
  Color,
  Viewer as CesiumViewer,
  Entity as CesiumEntity,
} from "cesium";
import MissionPlayControls from "./MissionPlayControls";
import { useTelemetryStore } from "../store/telemetryStore";
import { cn } from "@/lib/utils";
import { StatsForNerds } from "./stats-for-nerds";
import { useAppStore } from "@/store/appStore";

export const Dashboard = () => {
  const viewerRef = useRef<CesiumViewer | null>(null);
  const rocketEntityRef = useRef<CesiumEntity | null>(null);
  const { currentState, isStatsOpen } = useAppStore();

  const { data } = useTelemetryStore();

  const telemetry = useMemo(() => {
    const altitude = data.altitude_sea_level.metres.at(-1) ?? 0;
    const lat = data.gnss.latitude.at(-1) ?? null;
    const lon = data.gnss.longitude.at(-1) ?? null;
    const missionTime = data.altitude_sea_level.mission_time.at(-1) ?? 0;

    return { altitude, lat, lon, missionTime };
  }, [data]);

  const flightHistory = useMemo(() => {
    const history: Cartesian3[] = [];

    const { latitude, longitude } = data.gnss;
    const { metres } = data.altitude_sea_level;

    for (let i = 0; i < latitude.length; i++) {
      const lat = latitude[i];
      const lon = longitude[i];
      const alt = metres[i];
      if (lat !== undefined && lon !== undefined && alt !== undefined) {
        history.push(Cartesian3.fromDegrees(lon, lat, alt));
      }
    }

    return history;
  }, [data.gnss, data.altitude_sea_level]);

  const rocketPosition = useMemo(
    () => telemetry.lat !== null && telemetry.lon !== null
      ? Cartesian3.fromDegrees(telemetry.lon, telemetry.lat, telemetry.altitude)
      : null,
    [telemetry.lat, telemetry.lon, telemetry.altitude]
  );

  const handleViewerReady = useCallback((viewer: CesiumViewer) => {
    viewerRef.current = viewer;
  }, []);

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
        {/* <Entity position={launchSitePosition} name="Launch Site">
          <PointGraphics pixelSize={12} color={Color.GREEN} />
        </Entity> */}

        {rocketPosition && (
          <Entity
            position={rocketPosition}
            name="Rocket"
            ref={(ref) => {
              if (ref?.cesiumElement) {
                rocketEntityRef.current = ref.cesiumElement;
              }
            }}
          >
            <PointGraphics pixelSize={14} color={Color.YELLOW} />
          </Entity>
        )}

        {flightHistory.length > 1 && (
          <Entity name="Flight Path">
            <PolylineGraphics
              positions={flightHistory}
              width={3}
              material={Color.YELLOW}
            />
          </Entity>
        )}
      </Viewer>

      {currentState === "replay" && (
        <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <MissionPlayControls />
        </div>
      )}
    </div>
  );
};
