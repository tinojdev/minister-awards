import { useGetCategoriesQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import { alpha } from "@mui/material";

export default function CategoryLink({ isSticky }) {
  const theme = useTheme();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2.5,
    },
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, error, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <Box margin=" 1rem auto" className="carousel-container carousel-fade" maxWidth={1000}>
      {data && (
        <div>
          <Carousel
            responsive={responsive}
            customLeftArrow={<CustomLeftArrow isSticky={isSticky}/>}
            customRightArrow={<CustomRightArrow isSticky={isSticky} />}
            removeArrowOnDeviceType={["mobile"]}
            partialVisible={false}
          >
            {data.map((category) => (
              <Box
                key={category.id}
                padding="4px"
                borderRadius="6px"
                sx={{
                  backgroundColor: alpha(theme.palette.primary[100], 0.5), // Add transparency to the background
                  backdropFilter: "blur(10px)",
                  boxShadow: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href={`#${category.id}`}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary[1000],
                    fontSize: "0.8rem",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {category.name}
                </a>
              </Box>
            ))}
          </Carousel>
        </div>
      )}
    </Box>
  );
}
