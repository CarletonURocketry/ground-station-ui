import { useMemo } from "react";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { scaleLinear } from "@visx/scale";

interface MiniSparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    showArea?: boolean;
    className?: string;
}


export const MiniSparkline = ({
    data,
    width = 120,
    height = 32,
    color = "#10B981",
    showArea = true,
    className = "",
}: MiniSparklineProps) => {
    const { xScale, yScale, points } = useMemo(() => {
        if (data.length === 0) {
            return {
                xScale: scaleLinear({ domain: [0, 1], range: [0, width] }),
                yScale: scaleLinear({ domain: [0, 1], range: [height, 0] }),
                points: [],
            };
        }

        const minY = Math.min(...data);
        const maxY = Math.max(...data);
        const padding = (maxY - minY) * 0.1 || 1; // Add 10% padding, or 1 if flat

        const xScale = scaleLinear({
            domain: [0, data.length - 1],
            range: [0, width],
        });

        const yScale = scaleLinear({
            domain: [minY - padding, maxY + padding],
            range: [height - 2, 2], // Leave 2px padding at top/bottom
        });

        const points = data.map((y, i) => ({ x: i, y }));

        return { xScale, yScale, points };
    }, [data, width, height]);

    if (data.length < 2) {
        return (
            <div
                className={`flex items-center justify-center text-xs text-gray-500 ${className}`}
                style={{ width, height }}
            >
                No data
            </div>
        );
    }

    return (
        <svg width={width} height={height} className={className}>
            {showArea && (
                <AreaClosed
                    data={points}
                    x={(d) => xScale(d.x)}
                    y={(d) => yScale(d.y)}
                    yScale={yScale}
                    fill={color}
                    fillOpacity={0.15}
                    curve={curveMonotoneX}
                />
            )}
            <LinePath
                data={points}
                x={(d) => xScale(d.x)}
                y={(d) => yScale(d.y)}
                stroke={color}
                strokeWidth={1.5}
                curve={curveMonotoneX}
            />
            {/* Current value dot */}
            <circle
                cx={xScale(points.length - 1)}
                cy={yScale(points[points.length - 1].y)}
                r={2.5}
                fill={color}
            />
        </svg>
    );
};

export default MiniSparkline;
