import React, { useRef, useEffect } from "react";
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
  const chartRef = useRef<Chart | null>(null); // ← pour stocker l'instance

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 💡 Détruire l’ancien graphique s’il existe
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // 🎨 Créer le gradient ici directement
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255,0,255,0.5)");
    gradient.addColorStop(1, "rgba(255,0,255,0)");

    chartRef.current = new Chart(ctx, {
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
        animation: false, // ← optionnel : pour éviter les animations
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []); // ← plus de dépendance ici

  return <canvas ref={canvasRef} style={{ width: "100%", height: "13%", marginLeft: "50px" }} />;
};

export default UserStatsChart;
