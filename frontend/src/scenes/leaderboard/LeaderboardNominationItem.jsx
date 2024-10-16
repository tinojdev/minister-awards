import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Modal,
} from "@mui/material";
import { useGetVotesByNominationQuery } from "@/state/api";
import CloseIcon from "@mui/icons-material/Close";
import { alpha } from "@mui/material";

export const LeaderboardNominationItem = ({ nomination }) => {
  const {
    data: votesData,
    error: votesError,
    isLoading: isLoadingVotes,
  } = useGetVotesByNominationQuery({
    categoryId: nomination.category,
    nominationId: nomination.id,
  });

  const [votes, setVotes] = useState(0);
  const [open, setOpen] = useState(false); // For modal

  useEffect(() => {
    if (votesData && Array.isArray(votesData)) {
      const totalWeight = votesData.reduce((acc, v) => acc + v.weight, 0);
      setVotes(totalWeight);
    }
  }, [votesData]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mediaSrc = `${import.meta.env.VITE_BASE_MEDIA_URL}${
    nomination.image || nomination.video
  }`;

  return (
    <Card sx={{ width: 300, marginBottom: 2 }}>
      <CardActionArea onClick={handleOpen}>
        {/* Media (Image, Video, GIF) */}
        <CardMedia
          component={nomination.image ? "img" : "video"}
          src={mediaSrc}
          sx={{ height: 150, width: "100%", objectFit: "contain" }}
          autoPlay={!nomination.image}
          muted={!nomination.image}
          loop={!nomination.image}
          controls={nomination.video ? true : undefined}
          alt="Nomination Media"
        />
        {/* Nomination Details */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Nominee: {nomination.nominated_voter}
          </Typography>
          {/* Display total votes */}
          {isLoadingVotes ? (
            <Typography>Loading votes...</Typography>
          ) : votesError ? (
            <Typography>Error loading votes</Typography>
          ) : (
            votesData.map((v) => (
              <Typography key={v.id}>Voted by: {v.voter}</Typography>
            ))
          )}
          <Typography>Total votes: {votes}</Typography>
        </CardContent>
      </CardActionArea>

      {/* Enlarged Modal for media */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="enlarged-media"
        aria-describedby="enlarged-media-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            backgroundColor: "white",
            outline: "none",
            boxShadow: 24,
          }}
        >
          <CardMedia
            component={nomination.image ? "img" : "video"}
            src={mediaSrc}
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            autoPlay={!nomination.image}
            muted={!nomination.image}
            loop={!nomination.image}
            controls={nomination.video ? true : undefined}
            alt="Enlarged Media"
          />
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: alpha("#000", 0.6),
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Card>
  );
};
