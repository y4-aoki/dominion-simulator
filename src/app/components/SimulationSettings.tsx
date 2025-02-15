"use client";

import { useState } from "react";
import { Paper, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Select, MenuItem, Tooltip, Button, Divider, Box, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function SimulationSettings({ onStart }: { onStart: () => void }) {
  const [simulationType, setSimulationType] = useState("single");
  const [provinceGoal, setProvinceGoal] = useState(5);
  const [turnLimit, setTurnLimit] = useState(20);
  const [strategy, setStrategy] = useState("treasureOnly");

  const strategyDescriptions: Record<string, { overview: string; actions: string[]; buys: string[] }> = {
    treasureOnly: {
      overview: "アクションカードを購入せず、財宝カードのみを購入する戦略です。",
      actions: ["なし（アクションカードは購入しない）"],
      buys: ["8金以上なら属州を購入", "6金以上なら金貨を購入", "3金以上なら銀貨を購入", "それ以外は何もしない"],
    },
  };

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
          <RadioGroup row value={simulationType} onChange={(e) => setSimulationType(e.target.value)}>
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
              value={provinceGoal}
              onChange={(e) => setProvinceGoal(Number(e.target.value))}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
          </li>
          <li>
            <FormLabel>最大ターン数</FormLabel>
            <TextField
              type="number"
              value={turnLimit}
              onChange={(e) => setTurnLimit(Number(e.target.value))}
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
            <Tooltip title="現在は『財宝購入のみ』が利用可能です。" arrow>
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Select value={strategy} size="small" onChange={(e) => setStrategy(e.target.value)}>
            <MenuItem value="treasureOnly">財宝のみ購入</MenuItem>
          </Select>
        </FormControl>

        {/* 選択した戦略の説明 */}
        <Box sx={{ bgcolor: "background.paper", borderRadius: 1, mt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {strategyDescriptions[strategy].overview}
          </Typography>
          <FormLabel sx={{ mb: 1 }}>アクションフェーズ</FormLabel>
          <ul style={{ marginTop: 4, marginBottom: 4, paddingLeft: 20 }}>
            {strategyDescriptions[strategy].actions.map((action, index) => (
              <li key={index}>
                <Typography variant="body2">{action}</Typography>
              </li>
            ))}
          </ul>
          <FormLabel sx={{ mb: 1 }}>購入フェーズ</FormLabel>
          <ul style={{ marginTop: 4, marginBottom: 4, paddingLeft: 20 }}>
            {strategyDescriptions[strategy].buys.map((buy, index) => (
              <li key={index}>
                <Typography variant="body2">{buy}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      {/* 実行ボタンを固定 */}
      <Box sx={{ position: "sticky", bottom: 0, backgroundColor: "white", pt: 2, pb: 2, mt: "auto" }}>
        <Button variant="contained" color="primary" onClick={onStart} fullWidth>
          シミュレーションを開始
        </Button>
      </Box>
    </Paper>
  );
}
