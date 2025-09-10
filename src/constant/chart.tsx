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
  Filler,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
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

    // 🎨 Dégradé plus doux
    const gradient = ctx.createLinearGradient(0, 0, 0, 240);
    gradient.addColorStop(0, "rgba(59,130,246,0.35)"); // blue-500 @ 35%
    gradient.addColorStop(1, "rgba(59,130,246,0)");

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
            borderColor: "#3B82F6", // blue-500
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            pointRadius: 2,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: { padding: 8 },
        plugins: {
          legend: {
            display: true,
            labels: { color: "#374151" }, // gray-700
          },
          tooltip: {
            backgroundColor: "rgba(17,24,39,0.9)", // gray-900
            titleColor: "#fff",
            bodyColor: "#E5E7EB", // gray-200
            padding: 10,
            cornerRadius: 6,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(156,163,175,0.2)" }, // gray-400 @20%
            ticks: { color: "#6B7280" }, // gray-500
          },
          x: {
            grid: { display: false },
            ticks: { color: "#6B7280" },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []); // ← plus de dépendance ici

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 m-4" style={{ height: 320 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default UserStatsChart;
