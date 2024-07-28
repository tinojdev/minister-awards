import React, { useState } from "react";

import santeriKuva from "@/assets/santeri.jfif";
import aliKuva from "@/assets/ali.png";
import tinoKuva from "@/assets/tino.jpg";
import vainoKuva from "@/assets/vaino.png";
import { Margin } from "@mui/icons-material";

const tableStyle = {
  color: "black",
  fontFamily: "Arial",
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

  return (
    <div>
      <h2>Top scores</h2>
      <table style={tableStyle}>
        <tbody>
          {users.slice(0, showAll ? users.length : 3).map((users) => (
            <tr style={trStyle} key={users.id}>
              <td style={tdStyle}>
                <img style={picStyle} src={users.picture} alt={users.name} />
              </td>
              <td style={tdStyleName}>{users.name}</td>
              <td style={tdStyle}>{users.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={buttonStyle} onClick={() => setShowAll(!showAll)}>
        {showAll ? "^" : "..."}
      </button>
    </div>
  );
};

export default TopUsersTable;
