import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Box, Typography } from "@mui/material";
import { useGetVotersQuery } from "@/state/api"; // Import the query hook

const TopUsersTable = () => {
  const [showAll, setShowAll] = useState(false);
  const { data, error, isLoading } = useGetVotersQuery(); // Fetch data using RTK Query

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Use the fetched data as the users array
  const users = [...data].sort((a, b) => b.total_points - a.total_points);
  const howManyToShow = showAll ? users.length : 3;

  return (
    <Box>
      <Typography variant="h2" component="h2">
        Parhaat käyttäjät
      </Typography>
      <TableContainer>
        <Paper>
          <Box sx={{ p: "10px" }}>
            <Table aria-label="simple table">
              <TableBody>
                {users.slice(0, howManyToShow).map((user, i) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      borderBottom:
                        i !== howManyToShow - 1 ? "1px solid black" : "",
                    }}
                  >
                    <TableCell align="right">
                      <Avatar alt={user.first_name} src={user.picture} />
                    </TableCell>
                    <TableCell align="right">{user.first_name}</TableCell>
                    <TableCell align="right">{user.total_points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
        <IconButton variant="outlined" onClick={() => setShowAll(!showAll)}>
          {showAll ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </TableContainer>
    </Box>
  );
};

export default TopUsersTable;
