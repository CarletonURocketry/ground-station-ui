import React from "react";
import { useGauge } from "use-gauge";

interface TemperatureGaugeProps {
  temperature: number;
}

function TemperatureGauge({ temperature }: TemperatureGaugeProps) {
  const {
    ticks,
    getTickProps,
    getLabelProps,
    valueToAngle,
    angleToValue,
    getArcProps,
    getNeedleProps,
    getSVGProps,
  } = useGauge({
    startAngle: 90,
    endAngle: 270,
    numTicks: 11,
    diameter: 300,
    domain: [-20, 50],
  });

  const arcOffset = 8;
  const arcStrokeWidth = 24;
  const tickLength = 10;
  const needleBaseRadius = 12;
  const needleTipRadius = 2;
  const needleOffset = 35;

  const { tip, base, points } = getNeedleProps({
    value: temperature,
    baseRadius: needleBaseRadius,
    tipRadius: needleTipRadius,
    offset: needleOffset,
  });

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0) return "#3B82F6";
    if (temp <= 25) return "#10B981";
    return "#EF4444";
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg {...getSVGProps()} className="max-w-full overflow-visible">
        {/* Background Arc */}
        <path
          {...getArcProps({
            offset: arcOffset,
            startAngle: 90,
            endAngle: 270,
          })}
          fill="none"
          className="stroke-stone-100"
          strokeWidth={arcStrokeWidth}
          strokeLinecap="round"
        />

        {/* Temperature Arc */}
        <path
          {...getArcProps({
            offset: arcOffset,
            startAngle: 90,
            endAngle: valueToAngle(temperature),
          })}
          fill="none"
          stroke={getTemperatureColor(temperature)}
          strokeWidth={arcStrokeWidth}
          strokeLinecap="round"
        />

        {/* Ticks and Labels */}
        <g id="ticks">
          {ticks.map((angle) => {
            const value = angleToValue(angle);
            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className="stroke-stone-300"
                  {...getTickProps({ angle, length: tickLength })}
                />
                <text
                  className="text-sm fill-stone-500 font-medium"
                  {...getLabelProps({ angle, offset: 20 })}
                >
                  {value}°C
                </text>
              </React.Fragment>
            );
          })}
        </g>

        {/* Needle */}
        <g id="needle">
          <circle className="fill-stone-300" {...base} r={24} />
          <circle className="fill-stone-700" {...base} />
          <circle className="fill-stone-700" {...tip} />
          <polyline className="fill-stone-700" points={points} />
          <circle className="fill-white" {...base} r={4} />
        </g>
      </svg>
    </div>
  );
}

export default TemperatureGauge;
