import * as React from "react";
import { useWebSocketContext } from "../contexts/WebSocketContext";
import Card from "./Card";
import LineChart from "./charts/LineChart";
import MultiLineChart from "./charts/MultiLineChart";
import GeneralMultiLineChart from "./charts/GeneralMultiLineChart";
import PressureGauge from "./charts/PressureGauge";
import TemperatureGauge from "./charts/TemperatureGauge";
import TabSwitcher from "./TabSwitcher";
import MapView from "./Map";

function TelemetryDashboard() {
	const { data } = useWebSocketContext();
	const telemetryData = data?.telemetry;
	const [activeTab, setActiveTab] = React.useState("dashboard");

	const tabs = [
		{ id: "dashboard", label: "Dashboard" },
		{ id: "map", label: "Map" },
	];

	if (!telemetryData) {
		return (
			<div className="flex-1 bg-white p-6 rounded-lg border border-[#D8DADA]">
				<p>Waiting for telemetry data...</p>
			</div>
		);
	}

	return (
		<div className="flex-1 bg-white p-6 rounded-lg border border-[#D8DADA] flex flex-col">
			<TabSwitcher
				activeTab={activeTab}
				tabs={tabs}
				onTabChange={setActiveTab}
			/>

			{activeTab === "map" && (
				<div className="flex-1 h-[calc(100%-3rem)] flex flex-col">
					<h2 className="text-lg font-semibold mb-4">Location Map</h2>
					<div className="flex-1">
						<MapView telemetryData={telemetryData} />
					</div>
				</div>
			)}

			{activeTab === "dashboard" && (
				<div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-6 h-full">
					{/* Full width items */}
					<div className="md:col-span-2">
						<Card title="Altitude">
							<LineChart
								telemetryData={telemetryData.altitude_sea_level}
								xDataKey="Mission time (s)"
								yDataKey="Altitude (m)"
							/>
						</Card>
					</div>

					<div className="md:col-span-2">
						<Card title="Linear Acceleration">
							<MultiLineChart
								telemetryData={telemetryData.linear_acceleration}
								xDataKey="Mission time (s)"
								yDataKey="Linear Acceleration (m/s^2)"
							/>
						</Card>
					</div>

					<div className="md:col-span-2">
						<Card title="Angular Velocity">
							<MultiLineChart telemetryData={telemetryData.angular_velocity} 
								xDataKey="Mission time (s)"
								yDataKey="Angular Velocity (°/s)"
							/>
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
			)}
		</div>
	);
}

export default TelemetryDashboard;
