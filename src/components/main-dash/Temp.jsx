import React from "react"

// Hooks
import { useStorage } from "../../hooks/useStorage";
import ReactEcharts from "echarts-for-react";



export default function Temp({className}){
    var x_pos =0; 
    var y_pos=0;

    const get_x = (data) => {
        return data.map((packet) => packet.altitude.temperature.celsius);
    };

    const get_y = (data) => {
        return data.map((packet) => packet.altitude.altitude.mission_time);
    };

    const [x, y] = useStorage(get_x, get_y);
    var colour;

    x_pos=x[0];
    y_pos = y[0];

    if (x_pos < 50){
      colour = '#66b3ff';
    }else if (x_pos >= 50) {
      colour = '#FFAB91';
    }
    console.log(x_pos);
    console.log(colour)


    const options = { series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          splitNumber: 10,
          itemStyle: {
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: 'red' // color at 0%
              }, {
                  offset: 1, color: 'blue' // color at 100%
              }],
              global: false // default is false
            }
          
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: '#cccccc'
          },
          data: [
            {
              value: Math.round(x_pos*10)/10
            }
          ]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 100,
          itemStyle: {
            color: "#80bfff"
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: Math.round(x_pos*10)/10
            }
          ]
        }
      ]}

    return (
        <ReactEcharts option = {options} className = {className}/>
    )
    };