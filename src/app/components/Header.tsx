import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">ドミニオン戦略シミュレーター</Typography>
          <Typography variant="body2" color="textSecondary">
            ドミニオンの戦略をシミュレーションし、最適な戦略を探るツールです。
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
