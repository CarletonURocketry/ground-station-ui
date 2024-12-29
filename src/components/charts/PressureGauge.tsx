import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

interface PressureGaugeProps {
  pressure: number;
}
function PressureGauge({ pressure }: PressureGaugeProps) {
  pressure = pressure / 1000
  return (
    <div style={{ maxWidth: "100%", maxHeight: "100%", overflow: 'visible' }}>
      <GaugeComponent
        type="radial"
        arc={{
          width: 0.3,
          padding: 0.01,
          cornerRadius: 2,
          subArcs: [
            {
              limit: 70,
              color: '#14ff3a',
              showTick: true
            },
            {
              limit: 80,
              color: '#8ce200',
              showTick: true
            },
            {
              limit: 90,
              color: '#bdc000',
              showTick: true
            },
            {
              limit: 100,
              color: '#dd9b00',
              showTick: true
            },
            {
              limit: 110,
              color: '#f56e00',
              showTick: true
            },
            {
              limit: 120,
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
            formatTextValue: value => value + 'KPa',
            style: { fill: "var(--text-color)", textShadow: "none" }
          },
          tickLabels: {
            type: 'outer',
            //   valueConfig: { formatTextValue: (value: string) => value + 'ºC', fontSize: 10 },
            ticks: [
              { value: 70 },
              { value: 80 },
              { value: 90 },
              { value: 100 },
              { value: 110 },
            ],
            defaultTickLineConfig: {
              color: "var(--text-color-secondary)"
            },
            defaultTickValueConfig: {
              style: { fill: "var(--text-color-secondary)", textShadow: "none" }
            }
          }
        }}
        value={pressure}
        minValue={60}
        maxValue={120}
      />

    </div>
  );
}

export default PressureGauge
