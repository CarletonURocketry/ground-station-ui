import React from "react"

// Hooks
import { useStorage } from "../../hooks/useStorage";

// Importing Echarts library 
import ReactEcharts from "echarts-for-react";

//Create GaugeGraph component 
//unit is the unit of the x value
//colour1 is the start colour for gradient 
//colour2 is the end colour for the gradient
export default function GaugeGraph({x_cb, y_cb, unit, colour1, colour2,className}){

    var x_pos;
    var y_pos;

    const [x, y] = useStorage(x_cb, y_cb);

    //Takes one value of x and y from array
    x_pos=x[0];
    y_pos = y[0];

    //Creates the specific gauge meter using the options that are aavialable in the library
    //There is two 
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
                  offset: 0, color: colour1 // color at 0%
              }, {
                  offset: 1, color: colour2 // color at 100%
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
            formatter: '{value}' +unit,
            color: '#cccccc'
          },
          data: [
            {
              value: Math.round(y_pos*10)/10,
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
            color: '#00b386'
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
              value: Math.round(y_pos*10)/10,
            }
          ]
        }
      ]}

    return (
        <ReactEcharts option = {options} className = {className}/>
    )

}
