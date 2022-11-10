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
  y_cb,
  options,
}) {
  // Getting x and y data using callbacks
  const [x, y] = useStorage(x_cb, y_cb);

  // Use dashboard preset by default
  if (!options) {
    options = DashGraph(title, x_title, y_title, x, y);
  }

  return <ReactEcharts className="card" option={options} />;
}
