import { useGetCategoriesQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.5
  }
};

export default function CategoryLink() {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  // const { data, error, isLoading } = useGetCategoriesQuery();
  const data = [
    {
      id: 1,
      nominations: ['Nomination A', 'Nomination B', 'Nomination C'],
      name: 'Vuoden taide',
    },
    {
      id: 2,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
    {
      id: 3,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
    {
      id: 3,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
    {
      id: 3,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
    {
      id: 3,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
    {
      id: 3,
      nominations: ['Nomination D'],
      name: 'Vuoden fakiiri',
    },
  ];
  console.log("🚀 ~ CategoryLink ~ data:", data)

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <Box mt="1rem" mb="1rem" className="carousel-container carousel-fade" >
      {data && (
        <div>
          <Carousel responsive={responsive} customLeftArrow={<CustomLeftArrow />} customRightArrow={<CustomRightArrow />} removeArrowOnDeviceType={["mobile"]} partialVisible={false}>
            {data.map((category) => (
              <Box
                key={category.id}
                padding="4px"
                borderRadius="6px"
                sx={{
                  backgroundColor: theme.palette.primary[100],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href={`#${category.id}`}
                  style={{ textDecoration: "none", color: theme.palette.primary[1000], fontSize: "0.8rem", width: "100%", textAlign: "center" }}
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
