import { useWebSocketContext } from "../contexts/WebsocketContext";

interface TelemetryValueProps {
	label: string;
	value: string | number;
}

function TelemetryValue({ label, value }: TelemetryValueProps) {
	return (
		<div className="flex flex-col">
			<span className="text-xs text-gray-500">{label}</span>
			<span className="font-mono font-medium text-sm md:text-base">
				{value}
			</span>
		</div>
	);
}

function TelemetryHeader() {
	const { data } = useWebSocketContext();

	const getAltitude = () => {
		if (!data?.telemetry?.altitude_launch_level?.metres) return "No data";
		const latestAltitude = data.telemetry.altitude_launch_level.metres[0];
		return latestAltitude !== undefined
			? `${latestAltitude.toFixed(2)}m`
			: "No data";
	};

	const getMissionTime = () => {
		if (!data?.telemetry?.last_mission_time) return "No data";
		return `T+${(data.telemetry.last_mission_time / 1000).toFixed(3)}s`;
	};

	const getAvailablePorts = () => {
		const ports = data?.status?.serial?.available_ports || [];
		return ports[0] || "Unavailable";
	};

	return (
		<header className="rounded-lg bg-white border-b border-[#D8DADA] p-4">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
					{/* Logo */}
					<div className="flex items-center space-x-2">
						<img
							src="/api/placeholder/40/40"
							alt="Logo"
							className="h-8 md:h-10"
						/>
					</div>

					{/* Telemetry Values - Grid on mobile, Flex on desktop */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center gap-4 md:gap-8">
						<TelemetryValue
							label="SPACECRAFT"
							value={data?.rocket || "No data"}
						/>
						<TelemetryValue
							label="MISSION"
							value={data?.status?.mission?.name || "No data"}
						/>
						<TelemetryValue label="MISSION TIME" value={getMissionTime()} />
						<TelemetryValue label="ALTITUDE" value={getAltitude()} />
						<TelemetryValue label="INCLINATION" value="No data" />

						{/* Console Identifier */}
						<div className="col-span-2 sm:col-span-3 md:col-span-1 md:ml-4">
							<div className="flex items-center space-x-2 border border-[#D8DADA] px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
								<span>{getAvailablePorts()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default TelemetryHeader;
