import * as React from "react";
import { Box, Typography, List, Button, Icon } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetCategoriesQuery,
  useGetVotersQuery,
  useGetVotes1Query,
} from "@/state/api";
import { LeaderboardNominationItem } from "../../components/LeaderboardNominationItem";
import Pedestal from "@/components/Pedestal";
import { useOutletContext } from "react-router-dom";
import DetailedStats from "@/components/DetailedStats";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Error from "@/components/Error";

const Leaderboard = () => {
  const [showmore, setShowmore] = useState(false);
  const { isSidebarOpen, showNavbar, scrollContainerRef } = useOutletContext();
  const {
    data: categories,
    error: categoryError,
    isLoading: isLoadingCategories,
  } = useGetCategoriesQuery();

  const {
    data: voters,
    error: votersError,
    isLoading: isLoadingVoters,
  } = useGetVotersQuery();

  const {
    data: votes,
    error: votesError,
    isLoading: isLoadingVotes,
  } = useGetVotes1Query();

  const handleButtonClick = () => {
    setShowmore((prevState) => !prevState);
  };

  // Check if votes is defined before using it
  const groupVotes = (voteData) => {
    const grouped = {};

    // Ensure that voteData is an array before iterating
    if (Array.isArray(voteData)) {
      voteData.forEach((vote) => {
        const key = `${vote.category}-${vote.nominated_voter}`; // Create a unique key
        if (!grouped[key]) {
          grouped[key] = {
            category: vote.category,
            nominated_voter: vote.nominated_voter,
            totalOrder: 0, // Initialize total weight for this category and voter
          };
        }
        grouped[key].totalOrder += vote.order; // Sum the weights for the votes
      });
    }

    return Object.values(grouped); // Convert the grouped object back into an array
  };

  // Check for loading or error states
  if (isLoadingCategories || isLoadingVoters || isLoadingVotes) {
    return <p>Loading...</p>;
  }

  if (categoryError || votersError || votesError) {
    return <Error />;
  }

  // Group votes using the fetched data
  const groupedVotes = groupVotes(votes || []); // Use an empty array if votes is undefined

  // Use fallback to ensure voters is an array
  const sortedVoters = Array.isArray(voters)
    ? [...voters].sort((a, b) => b.total_points - a.total_points)
    : [];

  return (
    <Box sx={{ padding: 4 }}>
      <Box>
        <Pedestal
          top3={sortedVoters.slice(0, 3)}
          isSidebarOpen={isSidebarOpen}
        />
      </Box>
      <Box
        maxWidth={1000}
        margin="0 auto"
        sx={{ height: showmore ? "auto" : 0, overflow: "hidden" }}
      >
        {showmore &&
          categories.map((category, index) => {
            const filteredVotes = votes?.filter(
              (vote) => vote.category === category.id
            );
            return (
              <DetailedStats
                key={index}
                category={category}
                votes={filteredVotes}
              />
            );
          })}
      </Box>
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
          {showmore ? "Näytä vähemmän" : "Näytä tarkat pistemäärät"}
          <Icon sx={{ display: "flex" }}>
            {showmore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Icon>
        </Button>
      </Box>
      {/* Loop over categories */}
      {categories.map((c) => (
        <Box key={c.id} sx={{ marginBottom: 4 }}>
          {/* Category Name */}
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            {c.name}
          </Typography>

          {/* Nominations in a List */}
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {c.nominations.map((n) => (
              <LeaderboardNominationItem nomination={n} key={n.id} />
            ))}
          </List>
        </Box>
      ))}

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table
          sx={{ minWidth: 650, borderCollapse: "collapse" }}
          aria-label="leaderboard table"
        >
          {/* Table Head with styling */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                }}
              >
                Voter Name
              </TableCell>
              {categories.map((category) => (
                <TableCell
                  key={category.id}
                  align="center"
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  {category.name}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                }}
              >
                Total Points
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body with zebra-striping */}
          <TableBody>
            {sortedVoters.map((voter) => {
              const voterVotes = groupedVotes.filter(
                (vote) => vote.nominated_voter === voter.first_name // Match votes by voter name
              );

              return (
                <TableRow
                  key={voter.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}
                >
                  {/* User Name */}
                  <TableCell
                    align="center"
                    sx={{ padding: "10px", fontSize: "1rem" }}
                  >
                    {voter.first_name}
                  </TableCell>

                  {/* Display Votes for Each Category */}
                  {categories.map((category) => {
                    const vote = voterVotes.find(
                      (vote) => vote.category === category.id
                    );
                    return (
                      <TableCell
                        key={category.id}
                        align="center"
                        sx={{ padding: "10px" }}
                      >
                        {vote ? vote.totalOrder : 0}{" "}
                        {/* Display total weight or 0 if no votes */}
                      </TableCell>
                    );
                  })}

                  {/* Total Points */}
                  <TableCell
                    align="center"
                    sx={{
                      padding: "10px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {voter.total_points}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
