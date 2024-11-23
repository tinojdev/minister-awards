import { Box, Typography } from "@mui/material";
import React from "react";
import Biden from "@/assets/Biden.gif";

const Error = ({status, isNonMobile}) => {
  let status2 = "404";
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      sx={{ width: "100%" }}
    >
      <img src={Biden} width="100%" style={{ display: "block" }} />

      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize={isNonMobile ? 100 : 80} lineHeight={1}>
          {status}
        </Typography>
        <Typography fontWeight="bold" fontSize={isNonMobile ? 30 : 20} lineHeight={1} mt="1rem">
          Skibidi toilet sivu meni rikki
        </Typography>
      </Box>
    </Box>
  );
};

export default Error;
