// src/components/SimulationResultComponent.tsx
"use client";

import { useState } from "react";
import { Paper, Typography, Box, Divider, List, ListItem, ListItemText, IconButton, Tooltip } from "@mui/material";
import { Line } from "react-chartjs-2";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SimulationResult } from "@/types"; // 型をインポート
import { Chart, Tooltip as ChartTooltip, CategoryScale, LinearScale, BarElement, Title, Legend, PointElement, LineElement } from "chart.js";

Chart.register(ChartTooltip, CategoryScale, LinearScale, BarElement, Title, Legend, PointElement, LineElement);

const SimulationResultComponent = ({ simulationData }: { simulationData: SimulationResult | null }) => {
  const [expandedTurn, setExpandedTurn] = useState<number | null>(null);
  console.log(simulationData);
  
  if (!simulationData) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">シミュレーション結果</Typography>
        <Typography color="textSecondary">シミュレーションを開始すると結果が表示されます。</Typography>
      </Paper>
    );
  }


  // グラフデータの準備
  const chartData = {
    labels: simulationData.turns.map((turn) => `ターン ${turn.turnNumber}`),
    datasets: [
      {
        label: "所持金",
        data: simulationData.turns.map((turn) => turn.gold),
        borderColor: "#035AA6",
        fill: false,
      },
    ],
  };


  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5">シミュレーション結果</Typography>
      <Typography variant="body1">終了理由: {simulationData.gameEndReason}</Typography>
      <Typography variant="body2">最終的な所持金: {simulationData.finalGold}</Typography>

      {/* グラフの表示 */}
      <Box>
        <Typography variant="h6">ターンごとの金額</Typography>
        <Divider sx={{ my: 1 }} />
        <Line data={chartData} />
      </Box>

      {/* 購入フェーズリスト */}
      <Box>
        <Typography variant="h6">各ターンの購入フェーズ</Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          {simulationData.turns.map((turn, index) => (
            <div key={turn.turnNumber}>
              <ListItem component="div" onClick={() => setExpandedTurn(expandedTurn === index ? null : index)}>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="textSecondary">
                      ターン {turn.turnNumber}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" color="textPrimary">
                      金: {turn.gold} - 購入: {turn.purchases.join(", ")}
                    </Typography>
                  }
                />
                <Tooltip title="詳細を見る" arrow>
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
              {expandedTurn === index && (
                <Box sx={{ pl: 3 }}>
                  <Typography variant="body2">初期手札: {turn.initialHand.join(", ")}</Typography>
                  <Typography variant="body2">アクションカード: {turn.inPlay.join(", ")}</Typography>
                  <Typography variant="body2">山札: {turn.deck.join(", ")}</Typography>
                  <Typography variant="body2">捨て札: {turn.discard.join(", ")}</Typography>
                </Box>
              )}
            </div>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default SimulationResultComponent;
