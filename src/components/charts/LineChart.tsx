// import React, { useEffect, useState } from "react";
// import { ParentSize } from "@visx/responsive";
// import { Axis } from "@visx/axis";
// import {
//   curveCardinal,
//   curveMonotoneX,
//   curveNatural,
//   curveStep,
// } from "@visx/curve";
// import { scaleLinear } from "@visx/scale";
// import { LinePath } from "@visx/shape";
// import { Text } from "@visx/text";
// import { useWebSocketContext } from "../../contexts/useWebSocketContext";

// function LineChart() {
//   const { data } = useWebSocketContext();
//   const telemetry = data?.telemetry;
//   const altitudeData = telemetry?.altitude;

//   const [yScaleDomain, setYScaleDomain] = useState([0, 0]);

//   useEffect(() => {
//     if (altitudeData) {
//       const minAltitude = Math.min(...altitudeData.metres);
//       const maxAltitude = Math.max(...altitudeData.metres);
//       setYScaleDomain([minAltitude, maxAltitude]);
//     }
//   }, [altitudeData]);

//   if (!altitudeData) {
//     return <div>Loading...</div>;
//   }

//   const handleZoomInY = () => {
//     const [min, max] = yScaleDomain;
//     const newMin = min + (max - min) * 0.25;
//     const newMax = max - (max - min) * 0.25;
//     setYScaleDomain([newMin, newMax]);
//   };

//   const handleZoomOutY = () => {
//     const [min, max] = yScaleDomain;
//     const newMin = min - (max - min) * 0.25;
//     const newMax = max + (max - min) * 0.25;
//     setYScaleDomain([newMin, newMax]);
//   };

//   return (
//     <>
//       <button onClick={handleZoomInY}>Zoom In Y</button>
//       <button onClick={handleZoomOutY}>Zoom Out Y</button>
//       <ParentSize>
//         {({ width, height }) => {
//           const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//           const xMax = width - margin.left - margin.right;
//           const yMax = height - margin.top - margin.bottom;

//           // Set the initial domain for Y axis
//           if (yScaleDomain[0] === yScaleDomain[1]) {
//             setYScaleDomain([
//               Math.min(...altitudeData.metres),
//               Math.max(...altitudeData.metres),
//             ]);
//           }

//           const xScale = scaleLinear({
//             domain: [
//               Math.min(...altitudeData.mission_time),
//               Math.max(...altitudeData.mission_time),
//             ],
//             range: [0, xMax], // Scale starts at 0, the left side of the chart
//           });

//           const yScale = scaleLinear({
//             domain: yScaleDomain,
//             range: [yMax, 0], // Scale starts at the top of the chart
//           });

//           return (
//             <svg width={width} height={height}>
//               <g transform={`translate(${margin.left}, ${margin.top})`}>
//                 <LinePath
//                   data={altitudeData.mission_time.map((time, index) => ({
//                     x: time,
//                     y: altitudeData.metres[index],
//                   }))}
//                   x={(d) => xScale(d.x)}
//                   y={(d) => yScale(d.y)}
//                   stroke="steelblue"
//                   strokeWidth={2}
//                   curve={curveMonotoneX}
//                 />
//                 <Axis
//                   orientation="left"
//                   scale={yScale}
//                   label="Altitude (m)"
//                   labelOffset={15}
//                   hideTicks={true}
//                   labelProps={{
//                     fill: "#000",
//                     textAnchor: "middle",
//                     fontSize: 10,
//                     fontFamily: "Arial",
//                   }}
//                 />
//                 <Axis
//                   orientation="bottom"
//                   scale={xScale}
//                   top={yMax}
//                   label="Mission Time"
//                   labelOffset={15}
//                   hideTicks={true}
//                   labelProps={{
//                     fill: "#000",
//                     textAnchor: "middle",
//                     fontSize: 10,
//                     fontFamily: "Arial",
//                   }}
//                 />
//               </g>
//             </svg>
//           );
//         }}
//       </ParentSize>
//     </>
//   );
// }

// export default LineChart;

import React, { useState, useEffect } from 'react';
import { ParentSize } from '@visx/responsive';
import { Axis } from '@visx/axis';
import { curveMonotoneX } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';

interface LineChartProps<T> {
  telemetryData: any;
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
    <ParentSize>
      {({ width, height }) => {
        const margin = { top: 20, right: 30, bottom: 50, left: 40 };
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
                stroke="steelblue"
                strokeWidth={2}
                curve={curveMonotoneX}
              />
              <Axis orientation="left" scale={yScale} label={String(yDataKey)}/>
              <Axis orientation="bottom" scale={xScale} top={yMax} label={String(xDataKey)} />
            </g>
          </svg>
        );
      }}
    </ParentSize>
  );
}

export default LineChart;
