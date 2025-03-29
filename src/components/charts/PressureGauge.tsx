import React from "react";
import { useGauge } from "use-gauge";

interface PressureGaugeProps {
	pressure: number;
}

function PressureGauge({ pressure }: PressureGaugeProps) {
	const kPa = pressure / 1000;

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
		domain: [60, 120],
	});

	const arcOffset = 8;
	const arcStrokeWidth = 24;
	const tickLength = 10;
	const needleBaseRadius = 12;
	const needleTipRadius = 2;
	const needleOffset = 35;

	const { tip, base, points } = getNeedleProps({
		value: kPa,
		baseRadius: needleBaseRadius,
		tipRadius: needleTipRadius,
		offset: needleOffset,
	});

	const getPressureColor = (value: number) => {
		if (value <= 70) return "#14ff3a";
		if (value <= 80) return "#8ce200";
		if (value <= 90) return "#bdc000";
		if (value <= 100) return "#dd9b00";
		if (value <= 110) return "#f56e00";
		return "#ff3114";
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
					className="stroke-[#F1F0EE]"
					strokeWidth={arcStrokeWidth}
					strokeLinecap="round"
				/>

				{/* Pressure Arc */}
				<path
					{...getArcProps({
						offset: arcOffset,
						startAngle: 90,
						endAngle: valueToAngle(kPa),
					})}
					fill="none"
					stroke={getPressureColor(kPa)}
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
									{value} kPa
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

export default PressureGauge;
