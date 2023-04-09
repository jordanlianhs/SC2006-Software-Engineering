import React from "react";
import Chart from "chart.js/auto";

const ComparisonChart = ({ flat1, flat2 }) => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const labels = ["2023", "2024", "2025", "2026", "2027", "2028"];
    const data1 = [
      flat1.price,
      flat1.price_aft1year,
      flat1.price_aft2year,
      flat1.price_aft3year,
      flat1.price_aft4year,
      flat1.price_aft5year,
    ];
    const data2 = [
      flat2.price,
      flat2.price_aft1year,
      flat2.price_aft2year,
      flat2.price_aft3year,
      flat2.price_aft4year,
      flat2.price_aft5year,
    ];

    new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: flat1.streetName + " BLK " + flat1.blockNumber + " "+ flat1.flatType,
            data: data1,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: flat2.streetName + " BLK " + flat2.blockNumber + " "+ flat2.flatType,
            data: data2,
            fill: false,
            borderColor: "rgb(192, 75, 75)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: Math.min(Math.min(...data1), Math.min(...data2)) - 10000,
            max: Math.max(Math.max(...data1), Math.max(...data2)) + 10000,
            ticks: {
              stepSize: 5000,
              precision: 0,
            },
          },
        },
        maintainAspectRatio: false,
      },
    });
  }, [flat1, flat2]);

  return (
    <div>
      <canvas id="myChart" ref={canvasRef} style={{ width: "100%", height: "400px" }}></canvas>
    </div>
  );
};

export default ComparisonChart;
