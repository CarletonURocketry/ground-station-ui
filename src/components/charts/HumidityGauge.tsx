import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

interface HumidityGaugeProps {
  humidity: number;
}
function HumidityGauge({ humidity }: HumidityGaugeProps) {
  return (
    <GaugeComponent
      type="radial"
      arc={{
        width: 0.3,
        padding: 0.01,
        cornerRadius: 2,
        subArcs: [
          {
            limit: 25,
            color: '#bde7ff',
            showTick: true
          },
          {
            limit: 50,
            color: '#6bb9fb',
            showTick: true
          },
          {
            limit: 75,
            color: '#1a86f5',
            showTick: true
          },
          { color: '#004de3' }
        ]
      }}
      pointer={{
        color: '#000000',
        length: 0.80,
        width: 15,
      }}
      labels={{
        valueLabel: {
          formatTextValue: value => value + '% (RH)',
          style: { fill: "var(--text-color)", textShadow: "none" }
        },
        tickLabels: {
          type: 'outer',
          //   valueConfig: { formatTextValue: (value: string) => value + 'ºC', fontSize: 10 },
          ticks: [
            { value: 25 },
            { value: 50 },
            { value: 75 },
          ],
          defaultTickLineConfig: {
            color: "var(--text-color-secondary)"
          },
          defaultTickValueConfig: {
            style: { fill: "var(--text-color-secondary)", textShadow: "none" }
          }
        },
      }
      }
      value={humidity}
      minValue={0}
      maxValue={100}
    />
  );
}

export default HumidityGauge
