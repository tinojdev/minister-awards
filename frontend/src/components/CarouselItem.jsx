import React from "react";
import { Box, Skeleton } from "@mui/material";

const CarouselItem = () => {
  return (
    <Box display="flex" width="300px" height="300px">
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </Box>
  );
};

export default CarouselItem;
