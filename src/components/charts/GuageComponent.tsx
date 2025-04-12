import React from "react";
import { useGauge } from "use-gauge";

interface GaugeProps {
  guageValue: number;
  domainLow: number;
  domainHigh: number
  gaugeColorFunc: (value: number) => string;
  valueLabel: string;
}

function GuageComponent({ guageValue, domainLow, domainHigh, gaugeColorFunc: getGuageColor, valueLabel }: GaugeProps) {
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
    numTicks: 5,
    diameter: 300,
    domain: [domainLow, domainHigh],
  });

  const arcOffset = 8;
  const arcStrokeWidth = 24;
  const tickLength = 10;
  const needleBaseRadius = 12;
  const needleTipRadius = 2;
  const needleOffset = 35;

  const { tip, base, points } = getNeedleProps({
    value: guageValue,
    baseRadius: needleBaseRadius,
    tipRadius: needleTipRadius,
    offset: needleOffset,
  });

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
          className="stroke-[#F1F0EE]"
          strokeWidth={arcStrokeWidth}
          strokeLinecap="round"
        />

        {/* Arc */}
        <path
          {...getArcProps({
            offset: arcOffset,
            startAngle: 90,
            endAngle: valueToAngle(guageValue),
          })}
          fill="none"
          stroke={getGuageColor(guageValue)}
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
                  className="stroke-stone-500"
                  {...getTickProps({ angle, length: tickLength })}
                />
                <text
                  className="text-sm fill-stone-500 font-medium"
                  {...getLabelProps({ angle, offset: 20 })}
                >
                  {value}{valueLabel}
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

export default GuageComponent;
