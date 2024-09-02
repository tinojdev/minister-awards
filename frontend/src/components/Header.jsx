import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, id, subtitle }) => {
  const theme = useTheme()
  return (
    <Box>
      <Typography variant="h2" fontWeight="bold" id={id} sx={{ mb: "5px", color: theme.palette.secondary[500] }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
