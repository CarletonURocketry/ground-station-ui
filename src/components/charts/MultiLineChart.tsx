import { useState, useEffect } from "react";
import { ParentSize } from "@visx/responsive";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";

interface MultiLineChartProps {
	telemetryData: {
		mission_time: number[];
		x: number[];
		y: number[];
		z: number[];
		magnitude?: number[];
	};
}

function MultiLineChart({ telemetryData }: MultiLineChartProps) {
	const [xValues, setXValues] = useState<number[]>([]);
	const [yValues, setYValues] = useState<number[]>([]);
	const [zValues, setZValues] = useState<number[]>([]);
	const [magnitudeValues, setMagnitudeValues] = useState<number[]>([]);
	const [visibleLines, setVisibleLines] = useState<string[]>([
		"x",
		"y",
		"z",
		"magnitude",
	]);

	useEffect(() => {
		setXValues(telemetryData.mission_time || []);
		setYValues(telemetryData.y || []);
		setZValues(telemetryData.z || []);
		setMagnitudeValues(telemetryData.magnitude || []);
	}, [telemetryData]);

	const xDomain = [Math.min(...xValues), Math.max(...xValues)];
	const yDomain = [
		Math.min(...[...yValues, ...zValues, ...magnitudeValues]),
		Math.max(...[...yValues, ...zValues, ...magnitudeValues]),
	];

	const legendData = [
		{ label: "X Axis", color: "#E63030", key: "x" },
		{ label: "Y Axis", color: "#2467EC", key: "y" },
		{ label: "Z Axis", color: "#56AA67", key: "z" },
		{ label: "Magnitude", color: "#D9990C", key: "magnitude" },
	];

	const handleLegendClick = (key: string) => {
		if (visibleLines.length === 1 && visibleLines.includes(key)) {
			setVisibleLines(["x", "y", "z", "magnitude"]);
		} else if (visibleLines.includes(key)) {
			setVisibleLines(visibleLines.filter((line) => line !== key));
		} else {
			setVisibleLines([...visibleLines, key]);
		}
	};

	return (
		<div className="w-full h-full">
			<ParentSize>
				{({ width, height }) => {
					const margin = { top: 20, right: 30, bottom: 60, left: 50 };
					const xMax = width - margin.left - margin.right;
					const yMax = height - margin.top - margin.bottom;

					const xScale = scaleLinear({
						domain: xDomain,
						range: [0, xMax],
					});

					const yScale = scaleLinear({
						domain: yDomain,
						range: [yMax, 0],
					});

					return (
						<div className="relative w-full h-full">
							<svg width={width} height={height}>
								<g transform={`translate(${margin.left}, ${margin.top})`}>
									{visibleLines.includes("x") && (
										<LinePath
											data={xValues.map((x, i) => ({ x, y: yValues[i] }))}
											x={(d) => xScale(d.x)}
											y={(d) => yScale(d.y)}
											stroke="#E63030"
											strokeWidth={2}
											curve={curveMonotoneX}
										/>
									)}
									{visibleLines.includes("y") && (
										<LinePath
											data={xValues.map((x, i) => ({ x, y: zValues[i] }))}
											x={(d) => xScale(d.x)}
											y={(d) => yScale(d.y)}
											stroke="#2467EC"
											strokeWidth={2}
											curve={curveMonotoneX}
										/>
									)}
									{visibleLines.includes("z") && (
										<LinePath
											data={xValues.map((x, i) => ({ x, y: zValues[i] }))}
											x={(d) => xScale(d.x)}
											y={(d) => yScale(d.y)}
											stroke="#56AA67"
											strokeWidth={2}
											curve={curveMonotoneX}
										/>
									)}
									{visibleLines.includes("magnitude") &&
										magnitudeValues.length > 0 && (
											<LinePath
												data={xValues.map((x, i) => ({
													x,
													y: magnitudeValues[i],
												}))}
												x={(d) => xScale(d.x)}
												y={(d) => yScale(d.y)}
												stroke="#D9990C"
												strokeWidth={2}
												curve={curveMonotoneX}
											/>
										)}
									<AxisLeft
										scale={yScale}
										stroke="#949492"
										tickStroke="#949492"
										tickLabelProps={() => ({
											fill: "#949492",
											fontSize: 11,
											textAnchor: "end",
											dy: "0.33em",
										})}
										label="Values"
										labelProps={{
											fill: "#949492",
											fontSize: 12,
											textAnchor: "middle",
										}}
									/>
									<AxisBottom
										top={yMax}
										scale={xScale}
										stroke="#949492"
										tickStroke="#949492"
										tickLabelProps={() => ({
											fill: "#949492",
											fontSize: 11,
											textAnchor: "middle",
										})}
										label="Mission Time"
										labelProps={{
											fill: "#949492",
											fontSize: 12,
											textAnchor: "middle",
										}}
									/>
								</g>
							</svg>

							<div className="absolute left-0 right-0 bottom-0 sm:bottom-auto border border-[#D8DADA] bg-[#F1F0EE] p-1 rounded-lg mx-1 sm:mx-0">
								<div className="flex flex-wrap justify-center">
									{legendData.map((item, index) => (
										<div
											key={index}
											className="flex items-center mr-2 sm:mr-4 mb-1 sm:mb-0 cursor-pointer hover:bg-[#E6E6E5] active:bg-[#D8DADA] py-1 px-1.5 sm:px-2 rounded-sm"
											onClick={() => handleLegendClick(item.key)}
										>
											<div
												className="w-2 h-2 sm:w-3 sm:h-3 mr-1 rounded-sm flex-shrink-0"
												style={{
													backgroundColor: item.color,
													opacity: visibleLines.includes(item.key) ? 1 : 0.3,
												}}
											/>
											<span
												className="text-xs sm:text-sm whitespace-nowrap"
												style={{
													opacity: visibleLines.includes(item.key) ? 1 : 0.3,
												}}
											>
												{item.label}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					);
				}}
			</ParentSize>
		</div>
	);
}

export default MultiLineChart;
