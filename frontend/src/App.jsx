import { useState, useEffect } from "react";
import "./App.css";
import Home from "/src/scenes/home/Home";
import Wait from "/src/scenes/waiting_page/WaitingPage";
import Leaderboard from "/src/scenes/leaderboard/Leaderboard";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import CategoriesScene from "./scenes/categories/Categories";
import Layout from "/src/scenes/layout/Layout";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "/src/theme";
import { getLocalStorageState } from "./utils/utils";
import InvalidAuthentication from "./scenes/invalidAuthentication/InvalidAuthentication";

function SavePersonalId() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  if (searchParams.has("personalId")) {
    const id = searchParams.get("personalId");
    window.localStorage.setItem("personalId", JSON.stringify(id));
  }
  return <Navigate to={`/home`} replace />;
}

function App() {
  const theme = createTheme(themeSettings);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<SavePersonalId />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/waiting-page" element={<Wait />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/categories" element={<CategoriesScene />} />
            </Route>
            <Route
              path="/invalid-authentication"
              element={<InvalidAuthentication />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
