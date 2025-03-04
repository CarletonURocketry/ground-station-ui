// LineChart.tsx
import React, { useState, useEffect } from "react";
import { ParentSize } from "@visx/responsive";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";

interface LineChartProps<T> {
  telemetryData: T;
  xDataKey: keyof T;
  yDataKey: keyof T;
}

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
    <div className="w-full h-full">
      <ParentSize debounceTime={1}>
        {({ width, height }) => {
          const margin = { top: 20, right: 30, bottom: 40, left: 50 };
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
                  stroke="#EA6034"
                  strokeWidth={2}
                  curve={curveMonotoneX}
                />
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
                  label={String(yDataKey)}
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
                  label={String(xDataKey)}
                  labelProps={{
                    fill: "#949492",
                    fontSize: 12,
                    textAnchor: "middle",
                  }}
                />
              </g>
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}

export default LineChart;
