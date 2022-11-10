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
}) {
  // Getting x and y data using callbacks
  const [x, y] = useStorage(x_cb, y_cb);

  return (
    <ReactEcharts
      className="card"
      option={DashGraph(title, x_title, y_title, x, y)}
    />
  );
}
