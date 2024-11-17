import { useGetCategoriesQuery } from "@/state/api";
import { Box, useTheme, useMediaQuery, Skeleton } from "@mui/material";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "./CustomLeftArrow";
import CustomRightArrow from "./CustomRightArrow";
import { alpha } from "@mui/material";

export default function CategoryLink({ isSticky, isLoading, data }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  if (isLoading) {
    return (
      <Box margin="1rem auto" maxWidth={1000}>
        <Skeleton height={50} />
      </Box>
    );
  }

  return (
    <Box margin="1rem auto" className="carousel-container" maxWidth={1000}>
      {data &&
        (isSmallScreen ? (
          <Box
            display="flex"
            gap="8px"
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
            }}
          >
            {data.map((category) => (
              <Box
                key={category.id}
                component="div"
                display="inline-block"
                padding="8px"
                borderRadius="6px"
                sx={{
                  backgroundColor: alpha(theme.palette.primary[100], 0.5),
                  backdropFilter: "blur(10px)",
                  boxShadow: "none",
                  textAlign: "center",
                  minWidth: "120px",
                }}
              >
                <a
                  href={`#${category.id}`}
                  style={{
                    textDecoration: "none",
                    color: theme.palette.primary[1000],
                    fontSize: "0.8rem",
                    display: "block",
                  }}
                >
                  {category.name}
                </a>
              </Box>
            ))}
          </Box>
        ) : (
          <Carousel
            responsive={responsive}
            customLeftArrow={<CustomLeftArrow isSticky={isSticky} />}
            customRightArrow={<CustomRightArrow isSticky={isSticky} />}
            removeArrowOnDeviceType={["mobile"]}
            partialVisible={true}
          >
            {data.map((category) => (
              <Box
                key={category.id}
                padding="5px"
                borderRadius="6px"
                sx={{
                  backgroundColor: alpha(theme.palette.primary[100], 0.5),
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
        ))}
    </Box>
  );
}
