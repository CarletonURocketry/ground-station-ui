import React from "react";

// Hooks
import { useStorage } from "../../hooks/useStorage";
import { CenteredTitle } from "../../utils/chart-options";

// Importing Echarts library
import ReactEcharts from "echarts-for-react";

// Creates GaugeGraph component
// Title is the title of the graph
// Unit is the unit of the y axis
// Min and is the min and max of the gauge graph respectively
// inner_colour_1 is the start colour for the inner gradient
// inner_colour_2 is the end colour for the inner gradient
// outer_colour is the colour for the outer line
// className is passed to follow the same formatting as the rest of the other comps on the page
export default function GaugeGraph({
  title,
  x_cb,
  y_cb,
  unit,
  min,
  max,
  inner_colour_1,
  inner_colour_2,
  outer_colour,
  className,
}) {
  var x_pos;
  var y_pos;

  const [x, y] = useStorage(x_cb, y_cb);

  // Takes one value of x and y from array
  x_pos = x[0];
  y_pos = y[0];

  // Creates the specific gauge meter using the options that are aavialable in the library
  // There is two gauge lines, the inner and outer lines
  const options = {
    // title: {
    //   text: title,
    //   textAlign: "center",
    // },
    series: [
      // Controls inner gauge line
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,
        splitNumber: 10,
        itemStyle: {
          color: {
            // Creates gradient between the two colours passed in the comp
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: inner_colour_1, // Color at 0%
              },
              {
                offset: 1,
                color: inner_colour_2, // Color at 100%
              },
            ],
          },
        },
        // Shows the current progress of the value
        progress: {
          show: true,
          width: 25,
        },
        pointer: {
          show: false,
        },
        // Controls the thickness/width of the inner line
        axisLine: {
          lineStyle: {
            width: 25,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -20,
          color: "#999",
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        // Formatting of gauge data display
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 35,
          fontWeight: "bolder",
          formatter: "{value}" + unit, // Prints the value and the unit in the middle of the gauage meter
          color: "#cccccc",
        },
        // Data being passed to the graph
        data: [
          {
            value: Math.round(y_pos * 10) / 10, // Rounds value to a decimal place
          },
        ],
      },
      // Outer gauge line
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,

        itemStyle: {
          color: outer_colour, // Colour of the outer gauge line
        },

        // Shows the current progress of the value
        progress: {
          show: true,
          width: 8,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        // Data being passed to the graph
        data: [
          {
            value: Math.round(y_pos * 10) / 10, // Rounds the value to one decimal place
          },
        ],
      },
    ],
  };

  return <ReactEcharts option={options} className={className} />;
}
