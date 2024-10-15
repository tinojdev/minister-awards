import * as React from "react";
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
  useGetVotesByNominationQuery,
} from "@/state/api";
import { Box, List, ListItem, Typography } from "@mui/material";
import { LeaderboardNominationItem } from "./LeaderboardNominationItem";

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

  // Check if data is loading or if there are errors
  if (isLoadingCategories || isLoadingVoters) {
    return <p>Loading...</p>;
  }

  if (categoryError || votersError) {
    return <p>Error loading data</p>;
  }

  // Sort voters by total_score in descending order
  const sortedVoters = [...voters].sort(
    (a, b) => b.total_points - a.total_points
  );

  return (
    <Box>
      {categories.map((c) => (
        <List>
          <Typography key={c.id}>{c.name}</Typography>

          {c.nominations.map((n) => (
            <LeaderboardNominationItem nomination={n} />
          ))}
        </List>
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
