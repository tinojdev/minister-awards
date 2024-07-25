import { useState, useEffect } from "react";
import "./App.css";
import Home from "/src/scenes/home"
import Wait from "/src/scenes/waiting_page"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {
  let countDownDate = new Date("Dec 6, 2024 12:00:00").getTime();
  const [hasVoteBegun, setHasVoteBegun] = useState(false);

  useEffect(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    setHasVoteBegun(distance <= 0);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={hasVoteBegun ? <Home /> : <Navigate to="/waiting_page" replace />}
          />
          <Route path="/waiting_page" element={<Wait />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
