import React from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CustomLeftArrow = ({ onClick, isSticky }) => {
  console.log(" 🤓 ~ CustomLeftArrow ~ isSticky:", isSticky)
  
  return (
    <Box
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100px",
        height: "100%",
        borderRadius: "16px",
        background: isSticky
          ? "transparent"
          : "linear-gradient(to right, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%)", // More transparent when sticky
        transition: "background 0.3s ease",
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          left: "5px",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "4px",
          minWidth: "24px",
          minHeight: "24px",
          backgroundColor: "transparent",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "primary.main",
          },
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    </Box>
  );
};

export default CustomLeftArrow;
