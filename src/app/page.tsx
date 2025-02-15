"use client";

import { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import SimulationSettings from "./components/SimulationSettings";
import SimulationResults from "./components/SimulationResults";
import { SimulationResult } from "./types";
import { simulateGame } from "./logic/Simulation";

export default function Home() {
  const [simulationData, setSimulationData] = useState<SimulationResult | null>(null);

  const handleSimulationStart = () => {
    const result = simulateGame(); // シミュレーション実行
    setSimulationData(result); // 結果をstateに保存
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ width: "40%" }}>
            <SimulationSettings onStart={handleSimulationStart} />
          </Box>
          <Box sx={{ width: "60%" }}>
            <SimulationResults simulationData={simulationData} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
