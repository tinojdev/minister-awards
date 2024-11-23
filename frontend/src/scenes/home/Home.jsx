import { React, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { useGetCategoriesQuery } from "@/state/api";
import { useOutletContext } from "react-router-dom";
import Category from "@/components/Category";
import CategoryLink from "@/components/CategoryLink";
import { alpha } from "@mui/material";
import Wait from "../waiting_page/WaitingPage";
import Error from "@/components/Error";

const Home = () => {
  let { data, error, isLoading } = useGetCategoriesQuery();

  const [selections, setSelections] = useState({});
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const [isSticky, setIsSticky] = useState(false);

  const { isSidebarOpen, showNavbar, scrollContainerRef } = useOutletContext();

  const handleScroll = () => {
    const currentScrollY = scrollContainerRef?.current?.scrollTop || 0;
    if (currentScrollY > 280) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

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
      <Box sx={{ backgroundColor: theme.palette.primary[0] }}>
        <Wait />
        <Box
          sx={{
            padding: isNonMobile ? "0 2rem" : "0 0 0 0.25rem",
          }}
        >
          <CategoryLink isSticky={isSticky} isLoading={isLoading} />
        </Box>
        <Box maxWidth={1000} margin="0 auto" padding="0 2rem">
          {Array.from({ length: 4 }).map((_, index) => (
            <Box width="100%" sx={{ marginBottom: "3rem" }}>
              <Skeleton
                variant="text"
                width={200}
                sx={{ marginBottom: 0, fontSize: "50px" }}
              />
              {isLargeScreen
                ? Array.from({ length: 2 }).map((_, rowIndex) => (
                    <Box
                      key={`row-${index}-${rowIndex}`}
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {Array.from({ length: 2 }).map((_, colIndex) => (
                        <Skeleton
                          key={`skeleton-${index}-${rowIndex}-${colIndex}`}
                          variant="rounded"
                          height="120px"
                          width="calc(50% - 0.5rem)"
                          sx={{ borderRadius: "10px" }}
                        />
                      ))}
                    </Box>
                  ))
                : Array.from({ length: isNonMobile ? 4 : 3 }).map(
                    (_, subIndex) => (
                      <Skeleton
                        key={`inner-${index}-${subIndex}`}
                        variant="rounded"
                        height="120px"
                        width="100%"
                        sx={{ marginBottom: "1rem", borderRadius: "10px" }}
                      />
                    )
                  )}
              <Skeleton
                variant="rounded"
                width={100}
                height={25}
                sx={{
                  margin: "0 auto",
                  borderRadius: "10px",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Error status={error.status} isNonMobile={isNonMobile}/>
    );
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.primary[0] }}>
      <Wait />
      <Box
        sx={{
          position: "sticky",
          top: showNavbar ? (isNonMobile ? 76 : 80) : 0,
          zIndex: 1100,
          padding: isNonMobile ? "0 2rem" : "0 0 0 0.25rem",
          backgroundColor: isNonMobile
            ? alpha(theme.palette.primary[0], 0)
            : alpha(theme.palette.primary[0], 0.5),
          backdropFilter: isNonMobile ? "none" : "blur(10px)",
          boxShadow: "none",
        }}
      >
        <CategoryLink isSticky={isSticky} data={data} />
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
