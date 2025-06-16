import * as React from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
	IconPlus,
	IconMinus,
	IconTarget,
	IconMaximize,
	IconMinimize,
} from "@tabler/icons-react";
import { useMapContext } from "../contexts/MapContext";
import rocketIcon from "../assets/rocket.svg";

function fixLeafletMarker() {
	L.Icon.Default.mergeOptions({
		iconRetinaUrl:
			"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
		iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
		shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	});
}

// function MapAutoFollow({ position }: { position: [number, number] }) {
// 	const map = useMap();

// 	React.useEffect(() => {
// 		map.setView(position, map.getZoom());
// 	}, [map, position]);

// 	return null;
// }

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
		map.setView(center, map.getZoom(), { animate: true });
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

interface CoordinatesData {
	mission_time: number[];
	latitude: number[];
	longitude: number[];
}

interface MapViewProps {
	center?: [number, number];
	zoom?: number;
	telemetryData?: CoordinatesData;
	className?: string;
	useLocalTiles?: boolean;
}

function MapView({
	center = [51.505, -0.09],
	zoom = 18,
	telemetryData,
	className = "",
	useLocalTiles = false,
}: MapViewProps) {
	React.useEffect(() => {
		fixLeafletMarker();
	}, []);

	// get path positions and addPathPosition function from context
	const { pathPositions, addPathPosition } = useMapContext();

	const position: [number, number] = React.useMemo(() => {
		const latitude = telemetryData?.latitude;
		const longitude = telemetryData?.longitude;

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

	// update path history when position changes
	React.useEffect(() => {
		if (position[0] !== center[0] || position[1] !== center[1]) {
			addPathPosition(position);
		}
	}, [position, center, addPathPosition]);

	const pathOptions = {
		color: "blue",
		weight: 5,
		opacity: 0.7,
		smoothFactor: 1,
	};

	// Create custom rocket icon
	const customIcon = React.useMemo(() => {
		return new L.Icon({
			iconUrl: rocketIcon,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
			popupAnchor: [0, -16],
		});
	}, []);

	return (
		<div className={`w-full h-full ${className} z-50 relative map-container`}>
			<MapContainer
				center={position}
				zoom={zoom}
				style={{ height: "100%", width: "100%", minHeight: "500px" }}
				className="rounded-lg overflow-hidden"
				zoomControl={false} // Disable default zoom control
				attributionControl={true} // Keep attribution control
			>
				{useLocalTiles ? (
					<TileLayer maxZoom={20} url="http://localhost:8000/{z}/{x}/{y}.png" />
				) : (
					<TileLayer
						maxZoom={20}
						attribution=""
						url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
					/>
				)}

				{/* Draw the path line */}
				{pathPositions.length > 1 && (
					<Polyline positions={pathPositions} pathOptions={pathOptions} />
				)}

				<Marker position={position} icon={customIcon}>
					<Popup>
						Current Position
						{telemetryData && (
							<div>
								<p>Lat: {position[0].toFixed(6)}</p>
								<p>Lng: {position[1].toFixed(6)}</p>
							</div>
						)}
					</Popup>
				</Marker>
				<MapControls center={position} />
				{/* <MapAutoFollow position={position} /> */}
			</MapContainer>
		</div>
	);
}

export default MapView;
