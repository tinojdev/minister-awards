import { Box, Typography, Button, useTheme, IconButton } from "@mui/material";
import MryLogo from "@/assets/awards.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import Footer from "@/components/Footer";

export default function InvalidAuthentication() {
  const theme = useTheme();

  const openTelegram = () => {
    const telegramLink = "telegram://";
    window.open(telegramLink, "_blank");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: theme.palette.primary[0],
      }}
    >
      <Box
        sx={{
          mt: "1rem",
        }}
      >
        <img src={MryLogo} width={200} />
      </Box>
      <Box
        maxWidth={500}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt="10rem"
      >
        <Typography
          fontSize={30}
          fontWeight="bold"
          color={theme.palette.secondary[500]}
          mb={2}
          textAlign="center"
        >
          Siirry sivulle henkilökohtaisen linkkisi kautta
        </Typography>
        <IconButton
          disableRipple
          disableTouchRipple
          onClick={openTelegram}
          sx={{
            mt: 2,
            color: theme.palette.secondary[500],
          }}
        >
          <TelegramIcon sx={{fontSize: "40px"}}/>
        </IconButton>
      </Box>
      <Box position="absolute" bottom={0}>
        <Footer />
      </Box>
    </Box>
  );
}
