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

export default function Home() {
  const [simulationData, setSimulationData] = useState<SimulationResult | null>(null);

  const [config, setConfig] = useState<SimulationConfig>({
    simulationType: "single",
    maxTurns: 30,
    goalProvinces: 8,
    playActionPhase: NoActionStrategy.execute,
    playBuyPhase: TreasureOnlyBuyStrategy.execute
  });

  const handleSimulationStart = () => {
    const result = simulateGame(config);
    setSimulationData(result);
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
            <SimulationResults simulationData={simulationData} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
