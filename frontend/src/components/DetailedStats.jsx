import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import DetailedStatsItem from "./DetailedStatsItem";

const DetailedStats = ({ category, votes }) => {
  const theme = useTheme();
  let totalPoints = 0;
  const totalPointsPerNomination = votes.reduce((acc, vote) => {
    let { nomination, order } = vote;
    if (order === 3) {
      order = 1 / 3;
    } else if (order === 2) {
      order = 2 / 3;
    }
    totalPoints = totalPoints + order;
    acc[nomination] = (acc[nomination] || 0) + order;
    return acc;
  }, {});
  const results = {};
  votes.forEach((vote) => {
    const nomination = vote.nomination;

    if (!results[nomination]) {
      results[nomination] = {
        voted_first: [],
        voted_second: [],
        voted_third: [],
      };
    }

    if (vote.order === 1) {
      results[nomination].voted_first.push(vote.voter);
    } else if (vote.order === 2) {
      results[nomination].voted_second.push(vote.voter);
    } else if (vote.order === 3) {
      results[nomination].voted_third.push(vote.voter);
    }
  });

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: theme.palette.secondary[500] }}
      >
        {category.name}
      </Typography>
      <Box
        display="flex"
        gap="1rem"
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          mt: "0.5rem",
        }}
      >
        {category.nominations
          .map((nomination) => ({
            ...nomination,
            votes: totalPointsPerNomination[nomination.id] || 0,
          }))
          .sort((a, b) => b.votes - a.votes)
          .map((nomination, index) => (
            <DetailedStatsItem
              key={index}
              nomination={nomination}
              totalPoints={totalPoints}
              totalPointsPerNomination={nomination.votes}
              voters={results[nomination.id]}
            />
          ))}
      </Box>
    </Box>
  );
};

export default DetailedStats;
