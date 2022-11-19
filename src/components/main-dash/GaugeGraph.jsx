import React from "react"

// Hooks
import { useStorage } from "../../hooks/useStorage";

// Importing Echarts library 
import ReactEcharts from "echarts-for-react";

//Create GaugeGraph component 
//unit is the unit of the y axis
//min and is the min and max of the gauge graph respectively 
//colour1 is the start colour for gradient 
//colour2 is the end colour for the gradient
//className is passed to follow the same formatting as the rest of the other comps on the page
export default function GaugeGraph({x_cb, y_cb, unit, min, max, colour1, colour2,className}){

    var x_pos;
    var y_pos;

    const [x, y] = useStorage(x_cb, y_cb);

    //Takes one value of x and y from array
    x_pos=x[0];
    y_pos = y[0];

    //Creates the specific gauge meter using the options that are aavialable in the library
    //There is two gauage lines, the inner and outer lines
    const options = { series: [
        //the thicker inner gauge line 
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: min,
          max: max,
          splitNumber: 10,
          itemStyle: {
            color:{
              //creates the gradient between the two colours passed in the comp
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
            }
          
          },
          //to show the current progress of the value
          progress: {
            show: true,
            width: 25
          },
          pointer: {
            show: false
          },
          // to change the thickness/width of the inner line
          axisLine: {
            lineStyle: {
              width: 25
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
          //formatting of showing the gauage data 
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 35,
            fontWeight: 'bolder',
            //prints the value and the unit in the middle of the gauage meter
            formatter: '{value}' +unit,
            color: '#cccccc'
          },
          //data being passed to the graph
          data: [
            {
              //rounds the value to a decimal place
              value: Math.round(y_pos*10)/10,
            }
          ]
        },
        // the outer gauge line
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: min,
          max: max,

          itemStyle: {
            color: '#00b386' // the colour of the outer gauge line
          },
          
          //to show the current progress of the value
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
          //data being passed to the graph
          data: [
            {
              //rounds the value to one decimal place
              value: Math.round(y_pos*10)/10,
            }
          ]
        }
      ]}

    return (
        <ReactEcharts option = {options} className = {className}/>
    )

}
