import { ParentSize } from '@visx/responsive';
import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

interface TemperatureGaugeProps {
    temperature: number;
}
function TemperatureGauge({temperature}: TemperatureGaugeProps) {
  return (
    <ParentSize debounceTime={1}>
    {({ width, height }) => {
      const margin = { top: 20, right: 30, bottom: 50, left: 40 };
      const xMax = width - margin.left - margin.right;
      const yMax = height - margin.top - margin.bottom;
      return (
        <GaugeComponent
          style={{ width: `${width}px`, height: `${height}px` }}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            gradient: true,
            subArcs: [
                {
                    limit: -6,
                    color: '#5BE12C',
                    showTick: true
                  },
                  {
                    limit: 8,
                    color: '#F5CD19',
                    showTick: true
                  },
                  {
                    limit: 22,
                    color: '#F5CD19',
                    showTick: true
                  },
                  {
                    limit: 36,
                    color: '#EA4228',
                    showTick: true
                  },
                  { color: '#EA4228' }
            ]
          }}
          pointer={{
            color: '#000000',
            length: 0.80,
            width: 15,
          }}
          labels={{
            valueLabel: { formatTextValue: value => value + 'ºC' },
            tickLabels: {
              type: 'outer',
            //   valueConfig: { formatTextValue: (value: string) => value + 'ºC', fontSize: 10 },
              ticks: [
                { value: -6 },
                { value: 8 },
                { value: 22 },
                { value: 36 },
              ],
            }
          }}
          value={temperature}
          minValue={-20}
          maxValue={50}
        />
      );
    }}
  </ParentSize>
  );
}

export default TemperatureGauge
