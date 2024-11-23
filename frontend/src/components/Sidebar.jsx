import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ChevronRightOutlined, ChevronLeft } from "@mui/icons-material";
import MryLogo from "@/assets/awards.png";
import { Link } from "react-router-dom";
import { Instagram } from "@mui/icons-material";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
    if (!isNonMobile) {
      setIsSidebarOpen(false);
    }
  };

  const clickInstagram = () => {
    window.open("https://www.instagram.com/ministerit.ry/", "_blank");
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant={isNonMobile ? "persistent" : "temporary"}
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.primary[1000],
              backgroundColor: theme.palette.primary[50],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box display="flex">
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Link to="/home">
                    <img src={MryLogo} width="100%" alt="Logo" />
                  </Link>
                </Box>
              </Box>
            </Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation("home")}
                  sx={{
                    color:
                      pathname === "/home"
                        ? theme.palette.secondary[500]
                        : theme.palette.primary[1000],
                  }}
                >
                  <ListItemText
                    primary="Koti"
                    primaryTypographyProps={{
                      style: { fontSize: "20px", fontWeight: "bold" },
                    }}
                    sx={{ml: "1rem"}}
                  />
                  {pathname === "/home" && (
                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation("leaderboard")}
                  sx={{
                    color:
                      pathname === "/leaderboard"
                        ? theme.palette.secondary[500]
                        : theme.palette.primary[1000],
                  }}
                >
                  <ListItemText
                    primary="Tulostaulu"
                    primaryTypographyProps={{
                      style: { fontSize: "20px", fontWeight: "bold" },
                    }}
                    sx={{ml: "1rem"}}
                  />
                  {pathname === "/leaderboard" && (
                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>
            </List>
            <Box
              position="absolute"
              bottom={0}
              mb="1rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: "100%",
              }}
            >
              <IconButton
                onClick={clickInstagram}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Instagram
                  sx={{
                    fontSize: "2.5rem",
                    color: theme.palette.secondary[500],
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
