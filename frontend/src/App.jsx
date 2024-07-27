import { useState, useEffect } from "react";
import "./App.css";
import Home from "/src/scenes/home";
import Wait from "/src/scenes/waiting_page";
import Leaderboard from "/src/scenes/leaderboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "/src/scenes/layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "/src/theme";

function App() {
  let countDownDate = new Date("Dec 6, 2023 12:00:00").getTime();
  const now = new Date().getTime();
  const initialHasVoteBegun = countDownDate - now <= 0;

  const [hasVoteBegun, setHasVoteBegun] = useState(initialHasVoteBegun);

  console.log("🚀 ~ App ~ hasVoteBegun:", hasVoteBegun);

  useEffect(() => {
    if (!hasVoteBegun) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        if (distance <= 0) {
          setHasVoteBegun(true);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasVoteBegun, countDownDate]);

  const theme = createTheme(themeSettings);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route
                path="/home"
                element={hasVoteBegun ? <Home /> : <Navigate to="/waiting_page" replace />}
              />
              <Route path="/waiting_page" element={<Wait />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
