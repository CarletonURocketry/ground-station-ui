import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { useStorage } from '../../hooks/useStorage';
import { ParentSize } from '@visx/responsive';

import { Axis } from '@visx/axis';
import { curveNatural } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { Text } from '@visx/text';

function LineChart(props) {
    // Use the x and y functions from the useStorage hook
    const x = useStorage(props.x_cb);
    const y = useStorage(props.y_cb);

    // Create state variables for x and y data
    const [data, setData] = useState([]);

    // Update the data state when x or y change
    useEffect(() => {
        setData(x.map((xValue, index) => ({ x: xValue, y: y[index] })));
    }, [x, y]);

    return (
        <ParentSize debounceTime={0}>
            {({ width, height }) => {
                const padding = 75;
                const yPadding = Math.max(5, (Math.max(...y) - Math.min(...y)) * 0.05);
                
                // Define the scales of the graph with extra padding
                const xScale = scaleLinear({
                    domain: [
                        Math.min(...x) - 0.1,
                        Math.max(...x),
                    ],
                    range: [padding, width - padding],
                });
                
                const yScale = scaleLinear({
                    domain: [
                        Math.min(...y) - yPadding,
                        Math.max(...y) + yPadding,
                    ],
                    range: [height - padding, padding],
                });

                return (
                    // The svg element is the root of the graph
                    <svg width={width} height={height}>
                        {/* The background of the graph */}
                        <rect
                            x={0}
                            y={0}
                            width={width}
                            height={height}
                            fill={colors.darkGray}
                        />

                        {/* The x axis */}
                        <Axis
                            orientation="bottom"
                            top={height - padding}
                            scale={xScale}
                            numTicks={width > 520 ? 10 : 5}
                            stroke={colors.white}
                            tickStroke={colors.white}
                            tickLabelProps={() => ({
                                fill: colors.white,
                                fontSize: 14,
                                textAnchor: 'middle',
                                verticalAnchor: 'middle',
                            })}
                            hideZero
                        />

                        {/* The y axis */}
                        <Axis
                            orientation="left"
                            left={padding}
                            scale={yScale}
                            numTicks={height > 520 ? 10 : 5}
                            stroke={colors.white}
                            tickStroke={colors.white}
                            tickLabelProps={() => ({
                                fill: colors.white,
                                fontSize: 14,
                                textAnchor: 'end',
                                verticalAnchor: 'middle',
                            })}
                            hideZero
                        />

                        {/* X axis label */}
                        <Text
                            x={width / 2}
                            y={height - 15}
                            fill={colors.white}
                            fontSize={14}
                            textAnchor="middle"
                        >
                            {props.x_title}
                        </Text>

                        {/* Y axis label */}
                        <Text
                            x={padding / 4}
                            y={height / 2.75}
                            fill={colors.white}
                            fontSize={14}
                            textAnchor="end"
                            verticalAnchor="middle"
                            angle={-90}
                        >
                            {props.y_title}
                        </Text>

                        {/* The line path */}
                        <LinePath
                            data={data}
                            x={(d) => xScale(d.x)}
                            y={(d) => yScale(d.y)}
                            stroke={colors.red}
                            strokeWidth={4}
                            curve={curveNatural}
                        />
                    </svg>
                );
            }}
        </ParentSize>
    );
}

export default LineChart;
