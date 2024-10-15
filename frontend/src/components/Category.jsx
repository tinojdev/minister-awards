import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Icon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Header from "@/components/Header";
import CarouselItem from "./CategoryItem";

const Category = ({ id, name, nominations, selectedId, onSelectionChange }) => {
  const theme = useTheme();
  const [showmore, setShowmore] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const isXsmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  let rows = 220;

  if (isXsmallScreen) {
    rows *= 1.5;
  } else if (isSmallScreen) {
    rows *= 1.5;
  }

  const handleCheckboxChange = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    } else if (selectedItems.length < 3) {
      setSelectedItems((prev) => [...prev, itemId]);
    }
  };

  const handleButtonClick = () => {
    setShowmore((prevState) => !prevState);
  };

  return (
    <Box marginBottom="2rem">
      <Box display="flex" alignItems="start" marginBottom="0.5rem">
        <Header id={id} title={name} />
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            overflow: showmore ? "visible" : "hidden",
            height: showmore ? "auto" : rows,
            width: "100%",
          }}
        >
          {nominations.map((nomination) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={nomination.id}>
              <CarouselItem
                nomination={nomination}
                isSelected={selectedItems.includes(nomination.id)}
                order={selectedItems.indexOf(nomination.id) + 1} // Pass the order to CarouselItem
                onCheckboxChange={handleCheckboxChange}
              />
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center">
          {nominations.length > 3 && (
            <Button
              onClick={handleButtonClick}
              sx={{
                borderRadius: 5,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "inherit",
                },
              }}
            >
              {showmore ? "Näytä vähemmän" : "Näytä enemmän"}
              <Icon sx={{ display: "flex" }}>
                {showmore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Icon>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
