import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      ticks: {
        color: "#FFFFFF",
      },
      border: {
        color: "#FFFFFF",
      },
    },
    y: {
      ticks: {
        color: "#FFFFFF",
      },
      border: {
        color: "#FFFFFF",
      },
    },
  },
};

export function Chart({ chartData }) {
  const labels = chartData && Object.keys(chartData).map((label) => label);
  const data = {
    labels,
    datasets: [
      {
        data: chartData && Object.values(chartData).map((label) => label),
        backgroundColor: "#F0C3F1",
        barThickness: 25,
        borderRadius: 3,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
