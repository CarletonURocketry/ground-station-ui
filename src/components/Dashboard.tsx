// TODO: ADD ZUSTAND FOR RECORDING/REPLAY STATE MANAGEMENT

import MissionPlayControls from "./MissionPlayControls";

export const Dashboard = () => {
  return (
    <div className="flex-1 relative h-full bg-white p-6 rounded-lg border border-[#D8DADA] flex flex-col">
      <div className="flex justify-center absolute bottom-4 left-1/2 -translate-x-1/2">
        <MissionPlayControls />
      </div>
    </div>
  );
};
