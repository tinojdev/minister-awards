import React from "react";
import {
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useGetCategoriesQuery } from "@/state/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Header";
import Test from "@/components/Test";
import Category from "@/components/Category";
import { useState } from "react";
import TopUsersTable from "@/components/TopUsers";
import Wait from "../waiting_page/WaitingPage";
import CategoryLink from "@/components/CategoryLink";

const Home = () => {
  let { data, error, isLoading } = useGetCategoriesQuery();

  const [selections, setSelections] = useState({});
  console.log("🚀 ~ Home ~ selections:", selections);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const handleSelectionChange = (carouselId, itemId) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [carouselId]: itemId,
    }));
  };

  if (isLoading) {
    return (
      <Box padding="2rem" sx={{ backgroundColor: theme.palette.primary[0] }}>
        <Box maxWidth={1000} margin="0 auto">
          <Test />
          <Test />
          <Test />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        padding="2rem"
        sx={{
          backgroundColor: theme.palette.primary[0],
        }}
      >
        <Typography variant="h3">{error.status}</Typography>
        <Typography variant="body2">{error.error}</Typography>
      </Box>
    );
  }
  return (
    <Box padding="2rem" sx={{ backgroundColor: theme.palette.primary[0] }}>
      <Wait />
      <Box
        sx={{
          display: "flex",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Box maxWidth={1000} margin="0 auto">
          {data.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              nominations={category.nominations}
              selectedId={selections[category.id]}
              onSelectionChange={handleSelectionChange}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
