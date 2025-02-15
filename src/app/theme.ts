import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#035AA6", // プライマリカラー（青）
      contrastText: "#ffffff", // 文字色は白
    },
    secondary: {
      main: "#5B9ED9", // 補助的な青（サブカラー）
    },
    background: {
      default: "#EFEBD4", // 背景色（明るい色に変更）
      paper: "#ffffff", // 設定パネルなどの背景
    },
    text: {
      primary: "#0D0D0D", // メインテキストカラー（ダーク）
      secondary: "#BFBFBF", // セカンダリテキストカラー（灰色）
    },
    divider: "#035AA6", // 区切り線の色（青）
  },
  typography: {
    fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
    body1: {
      color: "#0D0D0D", // 本文の色はダーク
    },
  },
});

export default theme;
