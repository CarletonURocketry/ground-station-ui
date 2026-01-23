// TODO: ADD ZUSTAND FOR RECORDING/REPLAY STATE MANAGEMENT

import { Viewer, Entity, PointGraphics, PolylineGraphics } from "resium";
import { Cartesian3, Color } from "cesium";
import MissionPlayControls from "./MissionPlayControls";

const rocketPosition = Cartesian3.fromDegrees(-75.6972, 45.3876, 1000);
const launchSitePosition = Cartesian3.fromDegrees(-75.6972, 45.3876, 0);

const flightPath = [
  Cartesian3.fromDegrees(-75.6972, 45.3876, 0),
  Cartesian3.fromDegrees(-75.697, 45.3878, 200),
  Cartesian3.fromDegrees(-75.6968, 45.388, 500),
  Cartesian3.fromDegrees(-75.6965, 45.3882, 800),
  Cartesian3.fromDegrees(-75.6972, 45.3876, 1000),
];

export const Dashboard = () => {
  return (
    <div className="flex-1 relative h-full bg-white rounded-lg border border-[#D8DADA] flex flex-col overflow-hidden">
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
      >
        {/* Launch Site Marker */}
        <Entity
          position={launchSitePosition}
          name="Launch Site"
          description="Rocket Launch Site"
        >
          <PointGraphics pixelSize={12} color={Color.GREEN} />
        </Entity>

        {/* Current Rocket Position */}
        <Entity
          position={rocketPosition}
          name="Rocket"
          description="Current rocket position"
        >
          <PointGraphics pixelSize={14} color={Color.RED} />
        </Entity>

        {/* Flight Path Trajectory */}
        <Entity name="Flight Path">
          <PolylineGraphics
            positions={flightPath}
            width={3}
            material={Color.ORANGE}
          />
        </Entity>
      </Viewer>

      {/* Mission Play Controls Overlay */}
      <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <MissionPlayControls />
      </div>
    </div>
  );
};
