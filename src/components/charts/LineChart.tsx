import React, { useState, useEffect } from 'react';
import { ParentSize } from '@visx/responsive';
import { Axis, AxisBottom, AxisLeft } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';

interface LineChartProps<T> {
  telemetryData: T;
  xDataKey: keyof T;
  yDataKey: keyof T;
}

/**
 * LineChart Component
 * @param {Object} telemetryData - The telemetry data containing values to plot.
 * @param {keyof T} xDataKey - The key for the x-axis data in telemetryData.
 * @param {keyof T} yDataKey - The key for the y-axis data in telemetryData.
 * @returns {JSX.Element} The rendered LineChart component.
 * @example
 * const telemetryData = {
 *   mission_time: [0, 1, 2, 3, 4],
 *   metres: [0, 10, 20, 30, 40],
 * };
 * 
 * <LineChart
 *   telemetryData={telemetryData}
 *   xDataKey="mission_time"
 *   yDataKey="metres"
 * />
 */
function LineChart<T extends { [key: string]: number[] }>({
  telemetryData,
  xDataKey,
  yDataKey,
}: LineChartProps<T>) {
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);

  useEffect(() => {
    setXValues(telemetryData[xDataKey] || []);
    setYValues(telemetryData[yDataKey] || []);
  }, [telemetryData, xDataKey, yDataKey]);

  const xDomain = [Math.min(...xValues), Math.max(...xValues)];
  const yDomain = [Math.min(...yValues), Math.max(...yValues)];

  return (
    <ParentSize debounceTime={1}>
      {({ width, height }) => {
        const margin = { top: 20, right: 30, bottom: 100, left: 70 };
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
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <LinePath
                data={xValues.map((x, i) => ({ x, y: yValues[i] }))}
                x={(d) => xScale(d.x)}
                y={(d) => yScale(d.y)}
                stroke="var(--red-color)"
                strokeWidth={2}
                curve={curveMonotoneX}
              />
              <AxisLeft
                scale={yScale}
                stroke="var(--text-color-secondary)"
                tickStroke="var(--text-color-secondary)"
                tickLabelProps={() => ({
                  fill: "var(--text-color-secondary)",
                  fontSize: 11,
                  textAnchor: 'end',
                  dy: '0.33em',
                })}
                label={String(yDataKey)}
                labelProps={{
                  fill: "var(--text-color-secondary)",
                  fontSize: 12,
                  textAnchor: 'middle',
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
                  textAnchor: 'middle',
                })}
                label={String(xDataKey)}
                labelProps={{
                  fill: "var(--text-color-secondary)",
                  fontSize: 12,
                  textAnchor: 'middle',
                }}
              />
            </g>
          </svg>
        );
      }}
    </ParentSize>
  );
}

export default LineChart;
