import { useState, useEffect } from "react";
import "./App.css";
import Home from "/src/scenes/home";
import Wait from "/src/scenes/waiting_page";
import Leaderboard from "/src/scenes/leaderboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={hasVoteBegun ? <Home /> : <Navigate to="/waiting_page" replace />}
          />
          <Route path="/waiting_page" element={<Wait />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
