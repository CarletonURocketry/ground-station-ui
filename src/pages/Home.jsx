import React from "react";
import "./Home.css";
import ReactEcharts from "echarts-for-react";

export default function Home() {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  return (
    <main id="home">
      <h1>Main Dashboard</h1>
      <section id="graphs">
        <ReactEcharts className="card" option={option} />
        <ReactEcharts className="card" option={option} />
        <ReactEcharts className="card" option={option} />
        <ReactEcharts className="card" option={option} />
        <ReactEcharts className="card" option={option} />
      </section>
    </main>
  );
}
