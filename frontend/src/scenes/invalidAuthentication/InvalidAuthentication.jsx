import { Box, Typography } from "@mui/material";

export default function InvalidAuthentication() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h1" color="whitesmoke">
        Siirry sivulle henkilökohtaisen linkkisi kautta.
      </Typography>
    </Box>
  );
}
