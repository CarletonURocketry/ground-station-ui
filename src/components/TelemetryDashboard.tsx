import * as React from "react";
import { useWebSocketContext } from "../contexts/WebSocketContext";
import Card from "./Card";
import GeneralMultiLineChart from "./charts/GeneralMultiLineChart";
import GuageComponent from "./charts/GuageComponent";
import TabSwitcher from "./TabSwitcher";
import MapView from "./Map";

const getTemperatureColor = (temp: number) => {
	if (temp <= 0) return "#3B82F6";
	if (temp <= 25) return "#10B981";
	return "#EF4444";
};

const getPressureColor = (value: number) => {
	if (value <= 70) return "#14ff3a";
	if (value <= 80) return "#8ce200";
	if (value <= 90) return "#bdc000";
	if (value <= 100) return "#dd9b00";
	if (value <= 110) return "#f56e00";
	return "#ff3114";
};

const getHumidityColor = (value: number) => {
	if (value <= 20) return "#14ff3a"; // Green for low humidity
	if (value <= 40) return "#8ce200"; // Light green
	if (value <= 60) return "#bdc000"; // Yellow
	if (value <= 80) return "#dd9b00"; // Orange
	return "#ff3114"; // Red for high humidity
};

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
							<GeneralMultiLineChart
								telemetryData={telemetryData.altitude_launch_level}
								xAxisLabel="Mission time (s)"
								yAxisLabel="Altitude (m)"
							/>
						</Card>
					</div>

					<div className="md:col-span-2">
						<Card title="Linear Acceleration">
							<GeneralMultiLineChart
								telemetryData={telemetryData.linear_acceleration}
								xAxisLabel="Mission time (s)"
								yAxisLabel="Linear Acceleration (m/s^2)"
							/>
						</Card>
					</div>

					<div className="md:col-span-2">
						<Card title="Angular Velocity">
							<GeneralMultiLineChart telemetryData={telemetryData.angular_velocity} 
								xAxisLabel="Mission time (s)"
								yAxisLabel="Angular Velocity (°/s)"
							/>
						</Card>
					</div>

					{/* Half width gauge items */}
					<div className="md:col-span-1">
						<Card title="Temperature">
							<div className="w-full h-full p-4 flex items-center justify-center">
								<div className="w-full max-w-[200px]">
									<GuageComponent
										guageValue={telemetryData.temperature.celsius[0] || 0}
										domainLow={-20}
										domainHigh={50}
										gaugeColorFunc={getTemperatureColor}
										valueLabel="°C"
									/>
								</div>
							</div>
						</Card>
					</div>

					<div className="md:col-span-1">
						<Card title="Pressure">
							<div className="w-full h-full p-4 flex items-center justify-center">
								<div className="w-full max-w-[200px]">
									<GuageComponent
										guageValue={telemetryData.pressure.pascals[0] / 1000 || 60}
										domainLow={60}
										domainHigh={270}
										gaugeColorFunc={getPressureColor}
										valueLabel="kPa"
									/>
								</div>
							</div>
						</Card>
					</div>

					<div className="md:col-span-1">
						<Card title="Humidity">
							<div className="w-full h-full p-4 flex items-center justify-center">
								<div className="w-full max-w-[200px]">
									<GuageComponent
										guageValue={telemetryData.humidity.percentage[0] || 0}
										domainLow={0}
										domainHigh={100}
										gaugeColorFunc={getHumidityColor}
										valueLabel="%"
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
