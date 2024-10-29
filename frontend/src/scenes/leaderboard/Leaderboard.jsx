import * as React from "react";
import { Box, Typography, List } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetCategoriesQuery, useGetVotersQuery } from "@/state/api";
import { LeaderboardNominationItem } from "./LeaderboardNominationItem";
import Pedestal from "@/components/Pedestal";

const Leaderboard = () => {
  // Fetch categories and voters
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
  
  // Use fallback to ensure voters is an array
  const sortedVoters = Array.isArray(voters)
    ? [...voters].sort((a, b) => b.total_points - a.total_points)
    : [];

  // Check if data is loading or if there are errors
  if (isLoadingCategories || isLoadingVoters) {
    return <p>Loading...</p>;
  }

  if (categoryError || votersError) {
    return <p>Error loading data</p>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box>
        <Pedestal top3={sortedVoters.slice(0,3)} />
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
              ></TableCell>
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
            {sortedVoters.map((voter, index) => (
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

                {/* Category Points Placeholder */}
                {categories.map((category) => (
                  <TableCell
                    key={category.id}
                    align="center"
                    sx={{ padding: "10px" }}
                  >
                    -
                  </TableCell>
                ))}

                {/* Total Points */}
                <TableCell
                  align="center"
                  sx={{ padding: "10px", fontSize: "1rem", fontWeight: "bold" }}
                >
                  {voter.total_points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
