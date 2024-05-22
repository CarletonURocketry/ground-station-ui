import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

interface HumidityGaugeProps {
    humidity: number;
}
function HumidityGauge({humidity}: HumidityGaugeProps) {
  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        width: 0.2,
        padding: 0.005,
        cornerRadius: 1,
        gradient: true,
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
        valueLabel: { formatTextValue: value => value + '% (RH)' },
        tickLabels: {
          type: 'outer',
        //   valueConfig: { formatTextValue: (value: string) => value + 'ºC', fontSize: 10 },
          ticks: [
            { value: 25 },
            { value: 50 },
            { value: 75 },
          ],
        }
      }}
      value={humidity}
      minValue={0}
      maxValue={100}
    />
  );
}

export default HumidityGauge
