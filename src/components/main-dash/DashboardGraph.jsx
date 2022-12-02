import React from "react";

// Utilities
import { DashGraph } from "../../utils/chart-options";

// Hooks
import { useStorage } from "../../hooks/useStorage";

// Components
import ReactEcharts from "echarts-for-react";

export default function DashboardGraph({
  title,
  x_title,
  y_title,
  x_cb,
  x_unit,
  y_cb,
  y_unit,
  options,
  line_colour,
  className,
}) {
  // Getting x and y data using callbacks
  const x = useStorage(x_cb);
  const y = useStorage(y_cb);

  // Format titles
  title = `${title} ${y[0]} ${y_unit}`; // Main title with latest val
  x_title = `${x_title} (${x_unit})`; // X title
  y_title = `${y_title} (${y_unit})`; // Y title

  // Use dashboard preset by default
  if (!options) {
    options = DashGraph(title, x_title, y_title, x, y, line_colour);
  }

  return <ReactEcharts className={className} option={options} />;
}
