import React from "react";
import { Box, Skeleton } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header";
import CarouselItem from "./CategoryItem";
import { useState } from "react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Category = ({ id, name, nominations, selectedId, onSelectionChange }) => {
  console.log("🚀 ~ Category ~ selectedId:", selectedId);

  const handleCheckboxChange = (itemId) => {
    onSelectionChange(id, itemId);
  };

  return (
    <Box marginBottom="2rem">
      <Box display="flex" alignItems="start" marginBottom="0.5rem">
        <Header id={id} title={name} />
      </Box>
      <Box>
        <Carousel responsive={responsive}>
          {nominations.map((nomination) => (
            <CarouselItem
              key={nomination.id}
              nomination={nomination}
              isSelected={selectedId === nomination.id}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default Category;
