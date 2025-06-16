import { useState, useEffect } from "react";
import { ParentSize } from "@visx/responsive";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";

interface GeneralMultiLineChartProps {
  telemetryData: {
    mission_time: number[];
    [key: string]: number[]; // Allow variable fields, but mission_time is required
  };
  xAxisLabel: string;
  yAxisLabel: string;
}

// If we ever need more colors, more can be added
const lineColors = ["#E63030", "#2467EC", "#56AA67", "#D9990C"];

function GeneralMultiLineChart({
  telemetryData,
  xAxisLabel,
  yAxisLabel,
}: GeneralMultiLineChartProps) {
  const [xValues, setXValues] = useState<number[]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const [dataMap, setDataMap] = useState<Map<string, number[]>>(new Map());
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    // Get all fields displayed on graph on initialization, set dataKeys field
    const keys = Object.keys(telemetryData).filter(
      (key) => key !== "mission_time"
    );
    setVisibleLines(keys);
    setDataKeys(keys);
  }, []);

  useEffect(() => {
    setXValues(telemetryData.mission_time || []);

    const keys = Object.keys(telemetryData).filter(
      (key) => key !== "mission_time"
    );
    setVisibleLines(keys);
    setDataKeys(keys);

    // Create a map of key-value pairs for the data
    const dataMap: Map<string, number[]> = new Map();
    keys.forEach((key: string) => {
      dataMap.set(key, telemetryData[key] || []);
    });

    // Update the state for visible lines and data keys
    setDataMap(dataMap);
  }, [telemetryData]);

  const xDomain = [Math.min(...xValues), Math.max(...xValues)];
  const yDomain = [
    Math.min(...(Array.from(dataMap.values()).flat() as number[])),
    Math.max(...(Array.from(dataMap.values()).flat() as number[])),
  ];

  const handleLegendClick = (key: string) => {
    if (visibleLines.length === 1 && visibleLines.includes(key)) {
      setVisibleLines(dataKeys);
    } else if (visibleLines.includes(key)) {
      setVisibleLines(visibleLines.filter((line: string) => line !== key));
    } else {
      setVisibleLines([...visibleLines, key]);
    }
  };

  return (
    <div className="w-full h-full">
      <ParentSize>
        {({ width, height }) => {
          const margin = { top: 20, right: 30, bottom: 60, left: 65 };
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

          let lineItems: any[] = [];
          let ind = 0;
          dataMap.forEach(
            (value: number[], key: string, _map: Map<string, number[]>) => {
              lineItems.push(
                visibleLines.includes(key) && (
                  <LinePath
                    key={key}
                    data={xValues.map((x: number, i: number) => ({
                      x,
                      y: value[i],
                    }))}
                    x={(d) => xScale(d.x)}
                    y={(d) => yScale(d.y)}
                    stroke={lineColors[ind]}
                    strokeWidth={2}
                    curve={curveMonotoneX}
                  />
                )
              );
              ind++
            }
          );

          const legendItems: any[] = dataKeys.map((key, ind) => {
            return (
              <div
                key={ind}
                className="flex items-center mr-2 sm:mr-4 mb-1 sm:mb-0 cursor-pointer hover:bg-[#E6E6E5] active:bg-[#D8DADA] py-1 px-1.5 sm:px-2 rounded-sm"
                onClick={() => handleLegendClick(key)}
              >
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 mr-1 rounded-sm flex-shrink-0"
                  style={{
                    backgroundColor: lineColors[ind],
                    opacity: visibleLines.includes(key) ? 1 : 0.3,
                  }}
                />
                <span
                  className="text-xs sm:text-sm whitespace-nowrap"
                  style={{
                    opacity: visibleLines.includes(key) ? 1 : 0.3,
                  }}
                >
                  {key.length === 1
                    ? key[0].toUpperCase() + " Axis"
                    : key[0].toUpperCase() + key.slice(1).replace("_", " ")}
                </span>
              </div>
            );
          });

          return (
            <div className="relative w-full h-full">
              <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                  {lineItems}
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
                    label={yAxisLabel}
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
                    label={xAxisLabel}
                    labelProps={{
                      fill: "#949492",
                      fontSize: 12,
                      textAnchor: "middle",
                    }}
                  />
                </g>
              </svg>

              {legendItems.length > 1 && 
                <div className="absolute left-0 right-0 bottom-0 sm:bottom-auto border border-[#D8DADA] bg-[#F1F0EE] p-1 rounded-lg mx-1 sm:mx-0">
                <div className="flex flex-wrap justify-center">
                  {legendItems}
                </div>
              </div>}
            </div>
          );
        }}
      </ParentSize>
    </div>
  );
}

export default GeneralMultiLineChart;
