import { Box, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";

function Footer() {
  const theme = useTheme();
  const d = new Date();
  let CurrentYear = d.getFullYear();

  return (
    <Box sx={{ textAlign: "center", background: theme.palette.primary[0] }}>
      <Box sx={{}}>
        <Typography
          variant="h4"
          sx={{
            py: "15px",
            color: "black",
            ":hover": { color: theme.palette.secondary[700] },
          }}
        >
          {CurrentYear} Ministeri ry. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
