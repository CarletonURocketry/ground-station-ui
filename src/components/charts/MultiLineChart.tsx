import React, { useState, useEffect } from "react";
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

/**
 * MultiLineChart Component
 * @param {Object} telemetryData - The telemetry data containing mission time and values for x, y, z, and magnitude.
 * @param {number[]} telemetryData.mission_time - Array of mission time values.
 * @param {number[]} telemetryData.x - Array of x-axis values.
 * @param {number[]} telemetryData.y - Array of y-axis values.
 * @param {number[]} telemetryData.z - Array of z-axis values.
 * @param {number[]} [telemetryData.magnitude] - [OPTIONAL] Array of magnitude values.
 * @returns {JSX.Element} The rendered MultiLineChart component.
 * @example
 * const telemetryData = {
 *   mission_time: [0, 1, 2, 3, 4],
 *   x: [0, 1, 2, 3, 4],
 *   y: [0, -1, -2, -3, -4],
 *   z: [0, 2, 4, 6, 8],
 *   magnitude: [0, 1.5, 2.5, 3.5, 4.5],
 * };
 * 
 * <MultiLineChart telemetryData={telemetryData} />
 */
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
    { label: "X Axis", color: "var(--red-color)", key: "x" },
    { label: "Y Axis", color: "var(--blue-color)", key: "y" },
    { label: "Z Axis", color: "var(--green-color)", key: "z" },
    { label: "Magnitude", color: "var(--yellow-color)", key: "magnitude" },
  ];

  /**
   * Handles the click event for legend items.
   * Toggles the visibility of the corresponding line on the chart.
   * @param {string} key - The key of the legend item (x, y, z, magnitude).
   */
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
    <ParentSize debounceTime={1}>
      {({ width, height }) => {
        const margin = { top: 20, right: 30, bottom: 150, left: 70 }; // Increase bottom margin for the legend
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
          <div style={{ position: "relative", width, height }}>
            <svg width={width} height={height}>
              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {visibleLines.includes("x") && (
                  <LinePath
                    data={xValues.map((x, i) => ({ x, y: yValues[i] }))}
                    x={(d) => xScale(d.x)}
                    y={(d) => yScale(d.y)}
                    stroke="var(--red-color)"
                    strokeWidth={2}
                    curve={curveMonotoneX}
                  />
                )}
                {visibleLines.includes("y") && (
                  <LinePath
                    data={xValues.map((x, i) => ({ x, y: zValues[i] }))}
                    x={(d) => xScale(d.x)}
                    y={(d) => yScale(d.y)}
                    stroke="var(--blue-color)"
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
                      stroke="var(--yellow-color)"
                      strokeWidth={2}
                      curve={curveMonotoneX}
                    />
                  )}
                {visibleLines.includes("z") && (
                  <LinePath
                    data={xValues.map((x, i) => ({ x, y: zValues[i] }))}
                    x={(d) => xScale(d.x)}
                    y={(d) => yScale(d.y)}
                    stroke="var(--green-color)"
                    strokeWidth={2}
                    curve={curveMonotoneX}
                  />
                )}
                <AxisLeft
                  scale={yScale}
                  stroke="var(--text-color-secondary)"
                  tickStroke="var(--text-color-secondary)"
                  tickLabelProps={() => ({
                    fill: "var(--text-color-secondary)",
                    fontSize: 11,
                    textAnchor: "end",
                    dy: "0.33em",
                  })}
                  label="Values"
                  labelProps={{
                    fill: "var(--text-color-secondary)",
                    fontSize: 12,
                    textAnchor: "middle",
                  }}
                />
                <AxisBottom
                  top={yMax}
                  scale={xScale}
                  stroke="var(--text-color-secondary)"
                  tickStroke="var(--text-color-secondary)"
                  tickLabelProps={() => ({
                    fill: "var(--text-color-secondary)",
                    fontSize: 11,
                    textAnchor: "middle",
                  })}
                  label="Mission Time"
                  labelProps={{
                    fill: "var(--text-color-secondary)",
                    fontSize: 12,
                    textAnchor: "middle",
                  }}
                />
              </g>
            </svg>
            <div
              style={{
                position: "absolute",
                left: margin.left,
                right: margin.right,
                bottom: 20,
                display: "flex",
                justifyContent: "center",
                background: "var(--lighter-background-color)",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {legendData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleLegendClick(item.key)}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: item.color,
                      marginRight: "5px",
                      opacity: visibleLines.includes(item.key) ? 1 : 0.3,
                    }}
                  ></div>
                  <span
                    style={{
                      color: "var(--text-color)",
                      opacity: visibleLines.includes(item.key) ? 1 : 0.3,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </ParentSize>
  );
}

export default MultiLineChart;
