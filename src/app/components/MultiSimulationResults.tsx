"use client";

import { Box, Paper, Typography, Divider } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  Tooltip as ChartTooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";

Chart.register(ChartTooltip, CategoryScale, LinearScale, BarElement, Title, Legend);

export const MultiSimulationResults = ({ turnCounts }: { turnCounts: number[] }) => {
  if (turnCounts.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">シミュレーション結果</Typography>
        <Typography color="textSecondary">シミュレーションを開始すると結果が表示されます。</Typography>
      </Paper>
    );
  }

  const minTurn = Math.min(...turnCounts);
  const maxTurn = Math.max(...turnCounts);
  const avgTurn = (turnCounts.reduce((a, b) => a + b, 0) / turnCounts.length).toFixed(2);
  const medianTurn = (() => {
    const sorted = [...turnCounts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2) : sorted[mid];
  })();

  // ターン数ごとの回数を集計
  const turnCountMap: { [key: number]: number } = {};
  turnCounts.forEach((turn) => {
    turnCountMap[turn] = (turnCountMap[turn] || 0) + 1;
  });

  const sortedTurns = Object.keys(turnCountMap)
    .map(Number)
    .sort((a, b) => a - b);

  const chartData = {
    labels: sortedTurns.map((turn) => `${turn} ターン`),
    datasets: [
      {
        label: "終了までのターン数",
        data: sortedTurns.map((turn) => turnCountMap[turn]),
        backgroundColor: "#035AA6",
      },
    ],
  };

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* 棒グラフの表示 */}
      <Box sx={{ height: 400 }}>
        <Typography variant="h6">ターン数</Typography>
        <Divider sx={{ my: 1 }} />
        <Bar data={chartData} />
      </Box>

      <Typography variant="body1">平均ターン数: {avgTurn}</Typography>
      <Typography variant="body1">中央値ターン数: {medianTurn}</Typography>
      <Typography variant="body1">最小ターン数: {minTurn}</Typography>
      <Typography variant="body1">最大ターン数: {maxTurn}</Typography>

    </Paper>
  );
};
