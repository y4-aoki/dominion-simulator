"use client";

import { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import SimulationSettings from "./components/SimulationSettings";
import SimulationResults from "./components/SimulationResults";
import { SimulationConfig, SimulationResult } from "./types";
import { simulateGame } from "./logic/Simulation";
import { NoActionStrategy } from "./logic/ActionStrategies";
import { TreasureOnlyBuyStrategy } from "./logic/BuyStrategies";
import { MultiSimulationResults } from "./components/MultiSimulationResults";

export default function Home() {
  const [simulationData, setSimulationData] = useState<SimulationResult | null>(null);
  const [turnCounts, setTurnCounts] = useState<number[]>([]);

  const [config, setConfig] = useState<SimulationConfig>({
    simulationType: "single", // 初期設定は "single"
    maxTurns: 30,
    goalProvinces: 5,
    playActionPhase: NoActionStrategy.execute,
    playBuyPhase: TreasureOnlyBuyStrategy.execute
  });

  const handleSimulationStart = () => {
    if (config.simulationType === "single") {
      // "single" シミュレーション: 1回の結果を得る
      const result = simulateGame(config);
      setSimulationData(result);
    } else if (config.simulationType === "repeat") {
      // "repeat" シミュレーション: 10000回のターン数を集める
      const turnResults = Array.from({ length: 10000 }, () => {
        const result = simulateGame(config);
        return result.turns.length;
      });
      setTurnCounts(turnResults);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // xs で縦並び、md 以上で横並び
            gap: 4,
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <SimulationSettings config={config} onConfigChange={setConfig} onStart={handleSimulationStart} />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            {/* simulationType による条件付き描画 */}
            {config.simulationType === "single" ? (
              <SimulationResults simulationData={simulationData} />
            ) : (
              <MultiSimulationResults turnCounts={turnCounts} />
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
