"use client";

import { Paper, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, Tooltip, Button, Divider, Box, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ActionStrategy, BuyStrategy, SimulationConfig, StrategyOption } from "../types";
import { StrategyOptions as availableStrategies } from "@/logic/StrategyOptions";
import { useState } from "react";

type SimulationSettingsProps = {
  config: SimulationConfig;
  onConfigChange: (newConfig: SimulationConfig) => void;
  onStart: (config: SimulationConfig) => void;
};

export default function SimulationSettings({ config, onConfigChange, onStart }: SimulationSettingsProps) {
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyOption>(availableStrategies[0]);
  const [selectedActionStrategy, setSelectedActionStrategy] = useState<ActionStrategy>(availableStrategies[0].actionStrategies[0]);
  const [selectedBuyStrategy, setSelectedBuyStrategy] = useState<BuyStrategy>(availableStrategies[0].buyStrategies[0]);

  return (
    <Paper sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3, position: "relative", height: "100%" }}>
      {/* シミュレーション種類 */}
      <Box>
        <Typography variant="h6">シミュレーション種類
          <Tooltip title="1ゲームの詳細確認か、戦略を複数回試すかを選びます。" arrow>
            <IconButton size="small" sx={{ ml: 1 }}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
        <Divider sx={{ my: 1 }} />
        <FormControl component="fieldset" sx={{ width: "100%" }}>
          <RadioGroup
            row
            value={config.simulationType}
            onChange={(e) => onConfigChange({ ...config, simulationType: e.target.value as "single" | "repeat" })}
          >
            <FormControlLabel value="single" control={<Radio />} label="1ゲーム" />
            <FormControlLabel value="repeat" control={<Radio />} label="複数回試す" />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* 終了条件 */}
      <Box>
        <Typography variant="h6">終了条件
          <Tooltip title="シミュレーションを終了する条件を設定します。" arrow>
            <IconButton size="small" sx={{ ml: 1 }}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">
          以下のいずれかを満たしたときにシミュレーションを終了します。
        </Typography>
        <ul style={{ marginTop: 8, marginBottom: 8, paddingLeft: 20 }}>
          <li>
            <FormLabel>属州を購入した枚数</FormLabel>
            <TextField
              type="number"
              value={config.goalProvinces}
              onChange={(e) => onConfigChange({ ...config, goalProvinces: Number(e.target.value) })}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
          </li>
          <li>
            <FormLabel>最大ターン数</FormLabel>
            <TextField
              type="number"
              value={config.maxTurns}
              onChange={(e) => onConfigChange({ ...config, maxTurns: Number(e.target.value) })}
              fullWidth
              size="small"

            />
          </li>
        </ul>
      </Box>

      {/* 戦略設定 */}
      <Box>
        <Typography variant="h6">戦略設定</Typography>
        <Divider sx={{ my: 1 }} />
        <FormControl fullWidth>
          <Box display="flex" alignItems="center">
            <FormLabel>戦略の選択</FormLabel>
          </Box>
          <Select
            value={selectedStrategy.name}
            size="small"
            onChange={(e) => {
              const newStrategy = availableStrategies.find((s) => s.name === e.target.value) || availableStrategies[0];
              setSelectedStrategy(newStrategy);
            }}

          >
            {availableStrategies.map((strategy) => (
              <MenuItem key={strategy.name} value={strategy.name}>{strategy.name}</MenuItem>
            ))}
          </Select>
          <Typography variant="body2" color="text.secondary">
            {selectedStrategy.description}
          </Typography>
        </FormControl>

        {/* 選択した戦略の説明 */}
        <Box sx={{ bgcolor: "background.paper", borderRadius: 1, mt: 2 }}>
          <Box display="flex" alignItems="center">
            <FormLabel sx={{ mb: 1 }}>アクションフェーズ</FormLabel>
          </Box>
          <Select
            value={selectedActionStrategy.name}
            size="small"
            onChange={(e) => {
              const newActionStrategy = selectedStrategy.actionStrategies.find((s) => s.name === e.target.value) || selectedStrategy.actionStrategies[0];
              setSelectedActionStrategy(newActionStrategy);
              onConfigChange({ ...config, playActionPhase: newActionStrategy.execute })
            }}
          >
            {selectedStrategy.actionStrategies.map((actionStrategy) => (
              <MenuItem key={actionStrategy.name} value={actionStrategy.name}>{actionStrategy.name}</MenuItem>
            ))}
          </Select>
          <ul style={{ marginTop: 4, marginBottom: 4, paddingLeft: 20 }}>
            {selectedActionStrategy.descriptions.map((description, index) => (
              <li key={index}>
                <Typography variant="body2">{description}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 1, mt: 2 }}>
          <Box display="flex" alignItems="center">
            <FormLabel sx={{ mb: 1 }}>購入フェーズ</FormLabel>
          </Box>
          <Select
            value={selectedBuyStrategy.name}
            size="small"
            onChange={(e) => {
              const newBuyStrategy = selectedStrategy.buyStrategies.find((s) => s.name === e.target.value) || selectedStrategy.buyStrategies[0];
              setSelectedBuyStrategy(newBuyStrategy);
              onConfigChange({ ...config, playBuyPhase: newBuyStrategy.execute })
            }}

          >
            {selectedStrategy.buyStrategies.map((buyStrategy) => (
              <MenuItem key={buyStrategy.name} value={buyStrategy.name}>{buyStrategy.name}</MenuItem>
            ))}
          </Select>
          <ul style={{ marginTop: 4, marginBottom: 4, paddingLeft: 20 }}>
            {selectedBuyStrategy.descriptions.map((description, index) => (
              <li key={index}>
                <Typography variant="body2">{description}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      {/* 実行ボタン */}
      <Box sx={{ position: "sticky", bottom: 0, backgroundColor: "white", pt: 2, pb: 2, mt: "auto" }}>
        <Button variant="contained" color="primary" onClick={() => onStart(config)} fullWidth>
          シミュレーションを開始
        </Button>
      </Box>
    </Paper >
  );
}
