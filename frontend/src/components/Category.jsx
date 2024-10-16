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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  const itemsToShow = showmore
    ? nominations
    : isSmallScreen
    ? nominations.slice(0, 3)
    : nominations.slice(0, 4);

  return (
    <Box marginBottom="2rem" width="100%" maxWidth="1000px">
      <Box display="flex" alignItems="start" marginBottom="0.5rem">
        <Header id={id} title={name} />
      </Box>
      <Box >
        <Grid container spacing={2} >
          {itemsToShow.map((nomination) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              key={nomination.id}
              sx={{ flexGrow: 1 }}
            >
              <CarouselItem
                nomination={nomination}
                isSelected={selectedItems.includes(nomination.id)}
                order={selectedItems.indexOf(nomination.id) + 1} 
                onCheckboxChange={handleCheckboxChange}
              />
            </Grid>
          ))}
        </Grid>
        {nominations.length > (isSmallScreen ? 3 : 4) && (
          <Box display="flex" justifyContent="center" mt={2}>
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
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Category;
