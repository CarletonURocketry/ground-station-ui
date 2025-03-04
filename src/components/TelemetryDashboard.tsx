import React from "react";
import { useWebSocketContext } from "../contexts/WebsocketContext";
import Card from "./Card";
import LineChart from "./charts/LineChart";
import MultiLineChart from "./charts/MultiLineChart";
import PressureGauge from "./charts/PressureGauge";
import TemperatureGauge from "./charts/TemperatureGauge";

function TelemetryDashboard() {
  const { data } = useWebSocketContext();
  const telemetryData = data?.telemetry;

  if (!telemetryData) {
    return (
      <div className="flex-1 bg-white p-6 rounded-lg border border-[#D8DADA]">
        <p>Waiting for telemetry data...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-6 rounded-lg border border-[#D8DADA]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full">
        {/* Full width items */}
        <div className="md:col-span-2">
          <Card title="Altitude">
            <LineChart
              telemetryData={telemetryData.altitude_launch_level}
              xDataKey="mission_time"
              yDataKey="metres"
            />
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="Linear Acceleration">
            <MultiLineChart
              telemetryData={telemetryData.linear_acceleration_rel}
            />
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card title="Angular Velocity">
            <MultiLineChart telemetryData={telemetryData.angular_velocity} />
          </Card>
        </div>

        {/* Half width gauge items */}
        <div className="md:col-span-1">
          <Card title="Temperature">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <div className="w-full max-w-[200px]">
                <TemperatureGauge
                  temperature={telemetryData.temperature.celsius[0] || 0}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card title="Pressure">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <div className="w-full max-w-[200px]">
                <PressureGauge
                  pressure={telemetryData.pressure.pascals[0] || 0}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TelemetryDashboard;
