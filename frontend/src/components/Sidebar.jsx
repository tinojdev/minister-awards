import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ChevronRightOutlined, ChevronLeft } from "@mui/icons-material";
import MryLogo from "@/assets/mryy.png";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import CountDownEnd from "./CountDownEnd";

const navItems = [
  {
    text: "Koti",
    icon: <HomeIcon />,
  },
  {
    text: "Tulostaulu",
    icon: <LeaderboardIcon />,
  },
  {
    text: "Edelliset vuodet",
    icon: null,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  console.log("🚀 ~ isSidebarOpen:", isSidebarOpen);
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
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
              <Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Link to="/home">
                    <img src={MryLogo} width="100%" />
                  </Link>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        color:
                          active === lcText
                            ? theme.palette.secondary[600]
                            : theme.palette.primary[1000],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.secondary[600]
                              : theme.palette.primary[700],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
