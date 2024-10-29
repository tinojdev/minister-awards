import { React, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetCategoriesQuery } from "@/state/api";
import { useOutletContext } from "react-router-dom";
import Category from "@/components/Category";
import CategoryLink from "@/components/CategoryLink";
import { alpha } from "@mui/material";
import Wait from "../waiting_page/WaitingPage";

const Home = () => {
  let { data, error, isLoading } = useGetCategoriesQuery();

  const [selections, setSelections] = useState({});
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSticky, setIsSticky] = useState(false)

  // Get the scrollContainerRef from the Outlet context
  const { showNavbar, scrollContainerRef } = useOutletContext();


  const handleScroll = () => {
    const currentScrollY = scrollContainerRef?.current?.scrollTop || 0;
    if (currentScrollY > 280) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    // Ensure the scrollContainer exists before adding the event listener
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  const handleSelectionChange = (carouselId, itemId) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [carouselId]: itemId,
    }));
  };

  if (isLoading) {
    return (
      <Box padding="2rem" sx={{ backgroundColor: theme.palette.primary[0] }}>
        {/* Render loading skeleton */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="2rem" sx={{ backgroundColor: theme.palette.primary[0] }}>
        <Typography variant="h3">{error.status}</Typography>
        <Typography variant="body2">{error.error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[0] }}>
      <Wait />
      <Box
        sx={{
          position: "sticky",
          top: showNavbar 
          ? (isNonMobile ? 59 : 55) 
          : 0,
          zIndex: 1100,
          padding: isNonMobile ? "0 2rem" : "0 0 0 0.25rem",
          backgroundColor: isNonMobile ? alpha(theme.palette.primary[0], 0) : alpha(theme.palette.primary[0], 0.5),
          backdropFilter:  isNonMobile? "none" : "blur(10px)",
          boxShadow: "none",
        }}
      >
        <CategoryLink isSticky={isSticky} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isNonMobile ? "row" : "column",
          padding: "2rem",
        }}
      >
        <Box maxWidth={1000} margin="0 auto">
          {data.map((category, index) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              nominations={category.nominations}
              isLoading={isLoading}
              selectedId={selections[category.id]}
              onSelectionChange={handleSelectionChange}
              index={index}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
