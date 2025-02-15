"use client";

import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
