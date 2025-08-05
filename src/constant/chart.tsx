import React, { useRef, useEffect, useState } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const UserStatsChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradient, setGradient] = useState<string | CanvasGradient>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255,0,255,0.5)");
    gradient.addColorStop(1, "rgba(255,0,255,0)");

    setGradient(gradient);

    const chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
          {
            label: "Utilisateurs",
            data: [100, 120, 150, 130, 170, 200, 190, 210, 230, 240, 260, 300],
            borderColor: "magenta",
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy(); // nettoyage
  }, [gradient]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "13%", marginLeft: "50px" }} />;
};

export default UserStatsChart;
