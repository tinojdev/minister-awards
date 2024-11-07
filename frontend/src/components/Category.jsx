import React, { useState, useEffect, useMemo } from "react";
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
import {
  useDeleteVoteMutation,
  useLazyGetVotesQuery,
  usePostVoteMutation,
} from "@/state/api";
import Tour from "reactour";

const Category = ({ id, name, nominations, index }) => {
  const theme = useTheme();
  const [showmore, setShowmore] = useState(false);
  const [votes, setVotes] = useState([]);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [postVote, postVoteResult] = usePostVoteMutation();
  const [deleteVote, deleteVoteResult] = useDeleteVoteMutation();

  const [saveDelay, setSaveDelay] = useState(null);

  const [trigger, result, lastPromiseInfo] = useLazyGetVotesQuery({
    categoryId: id,
  });

  const cachedUpdateValuesFunction = useMemo(
    () => updateVotesData(),
    [updateVotesData]
  );

  const [isTourOpen, setIsTourOpen] = useState(false);

  const steps = [
    {
      selector: '[data-tour="checkbox-0"]',
      content:
        "Rastita kolme valintaruutua per kategoria tärkeysjärjestyksessä äänestääksesi.",
    },
    {
      selector: '[data-tour="media-0"]',
      content: "Klikkaa tästä suurentaaksesi kuvan tai videon.",
    },
  ];

  async function updateVotesData() {
    const votes = await trigger({ categoryId: id }).unwrap();
    setVotes(votes);
  }

  const handleCheckboxChange = async (itemId) => {
    const vote = votes.find((vote) => vote.nomination === itemId);

    if (vote !== undefined) {
      try {
        await deleteVote({ voteId: vote.id }).unwrap();
      } catch (e) {
        alert("Epääänestäminen epäonnistui!");
        console.error(e);
      }
      await updateVotesData();
    } else if (votes.length < 3) {
      try {
        await postVote({
          categoryId: id,
          nominationId: itemId,
          weight: votes.length + 1,
        }).unwrap();
      } catch (e) {
        alert("Äänestäminen epäonnistui!");
        console.error(e);
        return;
      }
      await updateVotesData();
    }
  };

  useEffect(() => {
    cachedUpdateValuesFunction;

    const hasSeenTour = localStorage.getItem("hasSeenTour");

    if (!hasSeenTour) {
      setIsTourOpen(true);
    }
  }, [cachedUpdateValuesFunction]);

  const handleButtonClick = () => {
    setShowmore((prevState) => !prevState);
  };

  const handleTourClose = () => {
    localStorage.setItem("hasSeenTour", "true");
    setIsTourOpen(false);
  };

  const itemsToShow = showmore
    ? nominations
    : isSmallScreen
    ? nominations.slice(0, 3)
    : nominations.slice(0, 4);

  return (
    <Box marginBottom="2rem" width="100%" maxWidth="none">
      {index === 0 && (
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={handleTourClose}
          className="custom-tour"
        />
      )}
      <Box display="flex" alignItems="start" marginBottom="0.5rem" width="100%">
        <Header id={id} title={name} />
      </Box>
      <Box width="100%">
        <Grid container spacing={2} width="100%">
          {itemsToShow.map((nomination, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              key={nomination.id}
              sx={{
                height: "auto",
                width: !isSmallScreen ? "300px" : "auto",
              }}
            >
              <CarouselItem
                nomination={nomination}
                isSelected={votes.some(
                  (vote) => vote.nomination === nomination.id
                )}
                order={
                  votes.findIndex((vote) => vote.nomination === nomination.id) +
                  1
                }
                onCheckboxChange={handleCheckboxChange}
                index={index}
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
