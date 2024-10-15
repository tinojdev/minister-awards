import React from "react";
import { useGetVotesByNominationQuery } from "@/state/api";
import { Box, ListItem, Typography } from "@mui/material";

export const LeaderboardNominationItem = ({ nomination }) => {
  const {
    data: data,
    error: votesError,
    isLoading: isLoadingVotes,
  } = useGetVotesByNominationQuery({
    categoryId: nomination.category,
    nominationId: nomination.id,
  });

  // Check if data is loading or if there are errors
  if (isLoadingVotes) {
    return <p>Loading...</p>;
  }

  if (votesError) {
    return <p>Error loading data</p>;
  }

  return (
    <Box>
      <img
        src={nomination.image}
        alt="Nomination Thumbnail"
        style={{ width: "100px", height: "150px" }}
      />
      <ListItem key={nomination.id}>
        Nominee:{nomination.nominated_voter}
      </ListItem>
      {data.map((v) => (
        <Box>
          <Typography>By: {v.voter}</Typography>
          <Typography>Vote: {v.weight}</Typography>
        </Box>
      ))}
    </Box>
  );
};
