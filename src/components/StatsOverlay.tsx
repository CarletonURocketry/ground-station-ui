interface StatsOverlayProps {
  phase: string;
  missionTime: string;
  altitude: number;
  velocity: number;
  acceleration: number;
  lat: number;
  lon: number;
}

export const StatsOverlay = ({
  phase,
  missionTime,
  altitude,
  velocity,
  acceleration,
  lat,
  lon,
}: StatsOverlayProps) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-white border shadow-lg p-5 rounded-xl font-mono min-w-75">
      <div className="text-center text-xl font-black text-green-700 mb-3 tracking-wide">
        {phase}
      </div>
      <div className="text-center text-2xl font-black text-blue-800 mb-4">
        {missionTime}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-base">
        <span className="font-bold text-gray-700">Altitude:</span>
        <span className="text-right font-black text-amber-700">
          {altitude.toFixed(1)} m
        </span>
        <span className="font-bold text-gray-700">Velocity:</span>
        <span className="text-right font-black text-orange-700">
          {velocity.toFixed(1)} m/s
        </span>
        <span className="font-bold text-gray-700">Acceleration:</span>
        <span className="text-right font-black text-red-700">
          {acceleration.toFixed(1)} m/s²
        </span>
        <span className="font-bold text-gray-700">Latitude:</span>
        <span className="text-right font-black text-gray-900">
          {lat.toFixed(6)}°
        </span>
        <span className="font-bold text-gray-700">Longitude:</span>
        <span className="text-right font-black text-gray-900">
          {lon.toFixed(6)}°
        </span>
      </div>
    </div>
  );
};
