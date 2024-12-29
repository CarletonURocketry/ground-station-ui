import { ParentSize } from '@visx/responsive';
import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

interface TemperatureGaugeProps {
  temperature: number;
}
function TemperatureGauge({ temperature }: TemperatureGaugeProps) {
  return (
    <ParentSize>
      {({ width, height }) => (
        <GaugeComponent
          // style={{width: '0.5vw', height: '0.5wv'}}
          type="radial"
          arc={{
            width: 0.3,
            padding: 0.01,
            cornerRadius: 2,
            subArcs: [
              {
                limit: -5,
                color: '#14ff3a',
                showTick: true
              },
              {
                limit: 10,
                color: '#8ce200',
                showTick: true
              },
              {
                limit: 25,
                color: '#bdc000',
                showTick: true
              },
              {
                limit: 40,
                color: '#dd9b00',
                showTick: true
              },
              {
                limit: 55,
                color: '#f56e00',
                showTick: true
              },
              {
                limit: 70,
                color: '#ff3114',
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
            valueLabel: {
              formatTextValue: value => value + 'ºC',
              style: { fill: "var(--text-color)", textShadow: "none" }
            },
            tickLabels: {
              type: 'outer',
              ticks: [
                { value: -5 },
                { value: 10 },
                { value: 25 },
                { value: 40 },
                { value: 55 },
              ],
              defaultTickLineConfig: {
                color: "var(--text-color-secondary)"
              },
              defaultTickValueConfig: {
                style: { fill: "var(--text-color-secondary)", textShadow: "none" }
              }
            }
          }}
          value={temperature}
          minValue={-20}
          maxValue={70}
        />
      )}
    </ParentSize>
  );
}

export default TemperatureGauge
