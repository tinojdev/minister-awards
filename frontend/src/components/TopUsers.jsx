import React, { useState } from "react";

import santeriKuva from "@/assets/santeri.jfif";
import aliKuva from "@/assets/ali.png";
import tinoKuva from "@/assets/tino.jpg";
import vainoKuva from "@/assets/vaino.png";
import { Margin } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";

/*
const tableStyle = {
  color: "black",
  fontFamily: "Arial",
  borderCollapse: "collapse",
};

const tdStyleName = {
  width: "75px",
};

const trStyle = {
  borderBottom: "1px solid black",
};

const tdStyle = {
  padding: "4px",
};

const picStyle = {
  width: "40px",
  height: "35px",
  borderRadius: "50%",
};

const buttonStyle = {
  marginTop: "10px",
  cursor: "pointer",
  backgroundColor: "#cc9f00",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
*/

const TopUsersTable = () => {
  const [showAll, setShowAll] = useState(false);

  const users = [
    { id: 1, picture: santeriKuva, name: "Santeri", score: 95 },
    { id: 2, picture: aliKuva, name: "Ali", score: 88 },
    { id: 3, picture: tinoKuva, name: "Tino", score: 72 },
    {
      id: 4,
      picture: "https://via.placeholder.com/150",
      name: "Albert",
      score: 55,
    },
    {
      id: 5,
      picture: "https://via.placeholder.com/150",
      name: "Tuomas",
      score: 40,
    },
    {
      id: 6,
      picture: "https://via.placeholder.com/150",
      name: "Taito",
      score: 39,
    },
    {
      id: 7,
      picture: "https://via.placeholder.com/150",
      name: "Tuukka",
      score: 35,
    },
    {
      id: 8,
      picture: "https://via.placeholder.com/150",
      name: "Visa",
      score: 34,
    },
    {
      id: 9,
      picture: "https://via.placeholder.com/150",
      name: "Patrik",
      score: 32,
    },
    {
      id: 10,
      picture: vainoKuva,
      name: "Väinö",
      score: 0,
    },
  ];
  const howManyToShow = showAll ? users.length : 3;
  return (
    /*
    <div>
      <h2>Top scores</h2>
      <table style={tableStyle}>
        <tbody>
          {users.slice(0, howManyToShow).map((users, i) => (
            <tr
              style={{
                borderBottom: i !== howManyToShow - 1 ? "1px solid black" : "",
              }}
              key={users.id}
            >
              <td style={tdStyle}>
                <img style={picStyle} src={users.picture} alt={users.name} />
              </td>
              <td style={tdStyleName}>{users.name}</td>
              <td style={tdStyle}>{users.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <IconButton variant="outlined" onClick={() => setShowAll(!showAll)}>
        {showAll ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
    </div>
    */

    <Box>
      <Typography variant="h2" component="h2">
        Top users
      </Typography>
      <TableContainer sx={{}}>
        <Paper>
          <Box sx={{ p: "10px" }}>
            <Table aria-label="simple table">
              <TableBody>
                {users.slice(0, howManyToShow).map((users, i) => (
                  <TableRow
                    key={users.id}
                    sx={{
                      borderBottom:
                        i !== howManyToShow - 1 ? "1px solid black" : "",
                    }}
                  >
                    <TableCell align="right">
                      <Avatar alt={users.name} src={users.picture} />
                    </TableCell>
                    <TableCell align="right">{users.name}</TableCell>
                    <TableCell align="right">{users.score}</TableCell>
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
