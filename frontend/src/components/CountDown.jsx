import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const endDate = new Date(import.meta.env.VITE_END_DATE).getTime();

function CountDown() {
  const [countdownText, setCountdownText] = useState("Äänestys alkaa");
  const [distance, setDistance] = useState(endDate - new Date().getTime());

  const theme = useTheme();
  const isXsmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let mainFontsize = "50px";
  let secondaryFontSize = "25px";

  if (isXsmallScreen) {
    mainFontsize = "40px";
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
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box mr="1rem">
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
              Päivän
            </Typography>
          </Box>
          <Box mr="1rem">
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
              sx={{ textAlign: "center", fontSize: secondaryFontSize }}
            >
              Tunnin
            </Typography>
          </Box>
          <Box mr="1rem">
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
              sx={{ textAlign: "center", fontSize: secondaryFontSize }}
            >
              Minuutin
            </Typography>
          </Box>
          <Box>
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
              sx={{ textAlign: "center", fontSize: secondaryFontSize }}
            >
              Sekunnin
            </Typography>
          </Box>
        </Box>
      )}
      {distance > 0 && (
        <Typography
          fontWeight="bold"
          sx={{ textAlign: "center", fontSize: mainFontsize }}
        >
          kuluttua
        </Typography>
      )}
    </Box>
  );
}

export default CountDown;
