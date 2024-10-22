import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const Uncheckedbox = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: "2px solid",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#0071BC",
        borderRadius: "3px",
      }}
    ></Box>
  );
};

export default Uncheckedbox;
