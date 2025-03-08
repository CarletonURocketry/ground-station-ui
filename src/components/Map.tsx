import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
	IconPlus,
	IconMinus,
	IconTarget,
	IconMaximize,
	IconMinimize,
} from "@tabler/icons-react";

// Fix for default marker icons in React Leaflet
// This is needed because the default markers use relative URLs that don't work in React
function fixLeafletMarker() {
	// Set the icon URLs directly instead of using delete
	L.Icon.Default.mergeOptions({
		iconRetinaUrl:
			"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	});
}

// Custom map controls component
function MapControls({ center }: { center: [number, number] }) {
	const map = useMap();
	const [isFullscreen, setIsFullscreen] = React.useState(false);

	const handleZoomIn = () => {
		map.zoomIn();
	};

	const handleZoomOut = () => {
		map.zoomOut();
	};

	const handleRecenter = () => {
		map.setView(center, map.getZoom());
	};

	const toggleFullscreen = () => {
		const mapContainer = document.querySelector(".map-container");
		if (!mapContainer) return;

		if (!isFullscreen) {
			if (mapContainer.requestFullscreen) {
				mapContainer.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
		setIsFullscreen(!isFullscreen);
	};

	React.useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	return (
		<div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
			<button
				type="button"
				onClick={handleZoomIn}
				className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				aria-label="Zoom in"
			>
				<IconPlus size={20} stroke={2} className="text-gray-700" />
			</button>
			<button
				type="button"
				onClick={handleZoomOut}
				className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				aria-label="Zoom out"
			>
				<IconMinus size={20} stroke={2} className="text-gray-700" />
			</button>
			<button
				type="button"
				onClick={handleRecenter}
				className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				aria-label="Recenter map"
			>
				<IconTarget size={20} stroke={2} className="text-gray-700" />
			</button>
			<button
				type="button"
				onClick={toggleFullscreen}
				className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
			>
				{isFullscreen ? (
					<IconMinimize size={20} stroke={2} className="text-gray-700" />
				) : (
					<IconMaximize size={20} stroke={2} className="text-gray-700" />
				)}
			</button>
		</div>
	);
}

// Define more specific types for the telemetry data
interface AccelerationData {
	mission_time: number[];
	x: number[];
	y: number[];
	z: number[];
}

interface CoordinatesData {
	latitude: number[];
	longitude: number[];
	mission_time: number[];
}

// Define the telemetry data structure to match what's actually provided
interface TelemetryData {
	last_mission_time?: number;
	altitude_sea_level?: {
		mission_time: number[];
		metres: number[];
		feet: number[];
	};
	altitude_launch_level?: {
		mission_time: number[];
		metres: number[];
		feet: number[];
	};
	temperature?: { celsius: number[] };
	pressure?: { pascals: number[] };
	linear_acceleration_rel?: AccelerationData;
	angular_velocity?: AccelerationData;
	coordinates?: CoordinatesData;
	[key: string]: unknown; // Allow for other properties with a more specific type than 'any'
}

interface MapViewProps {
	center?: [number, number];
	zoom?: number;
	telemetryData?: TelemetryData;
	className?: string;
}

function MapView({
	center = [51.505, -0.09],
	zoom = 13,
	telemetryData,
	className = "",
}: MapViewProps) {
	React.useEffect(() => {
		fixLeafletMarker();
	}, []);

	// Use coordinates from telemetry data if available
	const position: [number, number] = React.useMemo(() => {
		const latitude = telemetryData?.coordinates?.latitude;
		const longitude = telemetryData?.coordinates?.longitude;

		if (latitude && longitude && latitude.length > 0 && longitude.length > 0) {
			// Get the latest coordinates
			const latestIndex = latitude.length - 1;
			return [latitude[latestIndex], longitude[latestIndex]] as [
				number,
				number,
			];
		}
		return center;
	}, [telemetryData, center]);

	return (
		<div className={`w-full h-full ${className} relative map-container`}>
			<MapContainer
				center={position}
				zoom={zoom}
				style={{ height: "100%", width: "100%", minHeight: "500px" }}
				className="rounded-lg overflow-hidden"
				zoomControl={false} // Disable default zoom control
				attributionControl={true} // Keep attribution control
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						Current Position
						{telemetryData?.coordinates && (
							<div>
								<p>Lat: {position[0].toFixed(6)}</p>
								<p>Lng: {position[1].toFixed(6)}</p>
							</div>
						)}
					</Popup>
				</Marker>
				<MapControls center={position} />
			</MapContainer>
		</div>
	);
}

export default MapView;
