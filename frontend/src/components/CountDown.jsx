import { Box, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import { useState, useEffect } from "react";

const endDate = new Date(import.meta.env.VITE_END_DATE).getTime();

function CountDown() {
  const [countdownText, setCountdownText] = useState("Äänestyksen alkuun");
  const [distance, setDistance] = useState(endDate - new Date().getTime());

  const theme = useTheme();
  const isXsmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let mainFontsize = "50px";
  let secondaryFontSize = "25px";

  if (isXsmallScreen) {
    mainFontsize = "37px";
    secondaryFontSize = "20px";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = endDate - now;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdownText("Tilanne on vittu!");
        setDistance(0);
      } else {
        setDistance(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return (
    <Box>
      <Typography
        fontWeight="bold"
        sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0 }}
      >
        {countdownText}
      </Typography>
      {distance > 0 && (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Box mr="0.5rem" height="100%">
            <Typography
              fontWeight="bold"
              sx={{
                textAlign: "center",
                fontSize: mainFontsize,
                marginTop: 0,
                color: theme.palette.primary[900],
              }}
            >
              {days}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: secondaryFontSize,
                padding: "3px",
              }}
            >
              Päivää
            </Typography>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ height: "2rem", mt:"1.5rem"}}/>
          <Box mr="0.5rem" ml="0.5rem" height="100%">
            <Typography
              fontWeight="bold"
              sx={{
                textAlign: "center",
                fontSize: mainFontsize,
                marginTop: 0,
                color: theme.palette.primary[900],
              }}
            >
              {hours}
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontSize: secondaryFontSize, padding: "3px",}}
            >
              Tuntia
            </Typography>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ height: "2rem", width: "px", mt:"1.5rem"}}/>
          <Box mr="0.5rem" ml="0.5rem">
            <Typography
              fontWeight="bold"
              sx={{
                textAlign: "center",
                fontSize: mainFontsize,
                marginTop: 0,
                color: theme.palette.primary[900],
              }}
            >
              {minutes}
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontSize: secondaryFontSize, padding: "3px", }}
            >
              Minuuttia
            </Typography>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ height: "2rem", width: "px", mt:"1.5rem"}}/>
          <Box ml="0.5rem">
            <Typography
              fontWeight="bold"
              sx={{
                textAlign: "center",
                fontSize: mainFontsize,
                marginTop: 0,
                color: theme.palette.primary[900],
              }}
            >
              {seconds}
            </Typography>
            <Typography
              sx={{ textAlign: "center", fontSize: secondaryFontSize, padding: "3px", }}
            >
              Sekuntia
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CountDown;
