"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (
      data &&
      data.labels.length > 0 &&
      data.datasets &&
      data.datasets.length > 0
    ) {
      const doughnutChart = new Chart(chartRef.current, {
        type: "doughnut",
        data: data,
        options: {
          plugins: {
            legend: {
              position: "right",
            },
          },
          responsive: true,
        },
      });

      return () => {
        doughnutChart.destroy();
      };
    }
  }, [data, title]);

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
