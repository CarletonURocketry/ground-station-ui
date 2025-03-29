import { createContext, useContext, useState, type ReactNode } from "react";

interface MapContextType {
	pathPositions: [number, number][];
	addPathPosition: (position: [number, number]) => void;
	clearPathPositions: () => void;
}

const MapContext = createContext<MapContextType | null>(null);

/**
 * Custom hook to use the Map context.
 * @throws Will throw an error if the hook is used outside a MapProvider.
 * @returns {MapContextType} The Map context value.
 */
export const useMapContext = () => {
	const context = useContext(MapContext);
	if (!context) {
		throw new Error("useMapContext must be used within a MapProvider");
	}
	return context;
};

/**
 * MapProvider Component
 * @param {ReactNode} children - The child components to render within the provider.
 * @returns {JSX.Element} The rendered MapProvider component.
 */
export const MapProvider = ({ children }: { children: ReactNode }) => {
	// store the path positions
	const [pathPositions, setPathPositions] = useState<[number, number][]>([]);

	// add a new position to the path
	const addPathPosition = (position: [number, number]) => {
		setPathPositions((prevPositions) => {
			// avoid dupes
			const lastPos = prevPositions[prevPositions.length - 1];
			if (
				!lastPos ||
				lastPos[0] !== position[0] ||
				lastPos[1] !== position[1]
			) {
				return [...prevPositions, position];
			}
			return prevPositions;
		});
	};

	// clear path positions
	const clearPathPositions = () => {
		setPathPositions([]);
	};

	return (
		<MapContext.Provider
			value={{
				pathPositions,
				addPathPosition,
				clearPathPositions,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};
