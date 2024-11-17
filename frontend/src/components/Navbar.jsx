import React from "react";
import MryLogo from "@/assets/mryawards.png";
import { Box, AppBar, Toolbar, IconButton, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: alpha(theme.palette.primary[0], 0.5), // Add transparency to the background
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "80px",
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            marginRight: "3rem",
          }}
        >
          <Link to="/home">
            <img src={MryLogo} height={50} alt="Logo" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
