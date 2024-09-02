import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const firstEndDate = new Date(import.meta.env.VITE_START_DATE).getTime();
const secondEndDate = new Date(import.meta.env.VITE_END_DATE).getTime();

function CountDown() {
  const [countDownString, setCountDownString] = useState("");
  const [countDownDays, setCountDownDays] = useState("")
  const [countDownHours, setCountDownHours] = useState("")
  const [countDownMinutes, setCountDownMinutes] = useState("")
  const [countDownSeconds, setCountDownSeconds] = useState("")
  const [currentEndDate, setCurrentEndDate] = useState(firstEndDate);
  const [countdownText, setCountdownText] = useState("Äänestys alkaa");

  const theme = useTheme()

  const isXsmallScreen = useMediaQuery("(max-width: 600px)");

  let mainFontsize = "50px"
  let secondaryFontSize = "25px"

  if (isXsmallScreen) {
      mainFontsize = "40px"
      secondaryFontSize = "20px"
  }

  function checkInterval() {
    let now = new Date().getTime();
    let distance = currentEndDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountDownString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    setCountDownDays(days)
    setCountDownHours(hours)
    setCountDownMinutes(minutes)
    setCountDownSeconds(seconds)

    if (distance <= 0) {
      if (currentEndDate === firstEndDate) {
        setCurrentEndDate(secondEndDate);
        setCountdownText("Äänestys loppuu:");
      } else {
        setCountdownText("Tilanne on vittu!");

        setCountDownString("Abdu on vuoden ministeri!!!");
      }
    }
  }

  useEffect(() => {
    checkInterval();
    let interval = setInterval(checkInterval, 1000);
    return () => clearInterval(interval);
  }, [currentEndDate]);

  return (
    <Box>
      <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0 }}>
        {countdownText}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box mr="1rem">
          <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0, color: theme.palette.primary[900] }}>
            {countDownDays}
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: secondaryFontSize, padding: "3px" }}>
            Päivän
          </Typography>
        </Box>
        <Box mr="1rem">
          <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0, color: theme.palette.primary[900] }}>
            {countDownHours}
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: secondaryFontSize }}>
            Tunnin
          </Typography>
        </Box>
        <Box mr="1rem">
          <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0, color: theme.palette.primary[900] }}>
            {countDownMinutes}
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: secondaryFontSize }}>
            Minuutin
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize, marginTop: 0, color: theme.palette.primary[900] }}>
            {countDownSeconds}
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: secondaryFontSize }}>
            Sekunnin
          </Typography>
        </Box>
      </Box>
      <Typography fontWeight="bold" sx={{ textAlign: "center", fontSize: mainFontsize }}>
            kuluttua
      </Typography>
    </Box>
  );
}

export default CountDown;

/*
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const firstEndDate = new Date("Aug 5, 2024 16:20:00").getTime();
const secondEndDate = new Date("Dec 23, 2024 12:00:00").getTime();

function CountDown() {
  const [countDownString, setCountDownString] = useState("");
  const [currentEndDate, setCurrentEndDate] = useState(firstEndDate);
  const [hasVoteBegun, setHasVoteBegun] = useState(false);

  function checkInterval() {
    let now = new Date().getTime();
    let distance = currentEndDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setCountDownString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

    if (distance <= 0) {
      if (currentEndDate === firstEndDate) {
        setCurrentEndDate(secondEndDate);
      } else {
        setHasVoteBegun(true);
      }
    }
  }

  useEffect(() => {
    if (hasVoteBegun) {
      return;
    }
    checkInterval();
    let interval = setInterval(checkInterval, 1000);
    return () => clearInterval(interval);
  }, [hasVoteBegun, currentEndDate]);

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ textAlign: "center", fontSize: "60px", marginTop: 0 }}
      >
        {hasVoteBegun ? "Äänestys loppuu" : "Äänestys alkaa:"}
      </Typography>
      {!hasVoteBegun && (
        <Typography
          variant="h1"
          sx={{ textAlign: "center", fontSize: "60px", marginTop: "30px" }}
        >
          {countDownString}
        </Typography>
      )}
    </Box>
  );
}

export default CountDown;
*/
