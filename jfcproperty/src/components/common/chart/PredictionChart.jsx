import React from "react";
import Chart from "chart.js/auto";

const PredictionChart = ({ flat }) => {
    const canvasRef = React.useRef();

    React.useEffect(() => {
        const labels = ["2023", "2024", "2025", "2026", "2027", "2028"];
    const data = [
      flat.price,
      flat.price_aft1year,
      flat.price_aft2year,
      flat.price_aft3year,
      flat.price_aft4year,
      flat.price_aft5year,
    ];
    new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Price",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            min: Math.min(...data) - 10000, // set the minimum value of y-axis to be the minimum value of data minus 10000
            max: Math.max(...data) + 10000, // set the maximum value of y-axis to be the maximum value of data plus 10000
            ticks: {
              stepSize: 5000, // set the interval between ticks to be 5000
              precision: 0, // set the precision to be 0 to show only integers
            },
          },
        },
        maintainAspectRatio: false,
      },
    });
    }, [flat]);
    return (
        <div >
            <canvas id="myChart" ref={canvasRef} style={{ width: "100%", height: "400px" }}></canvas>
        </div>
    );
};

export default PredictionChart;
