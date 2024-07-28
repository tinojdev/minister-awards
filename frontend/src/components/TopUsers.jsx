import React, { useState } from "react";

import santeriKuva from "@/assets/santeri.jfif";
import aliKuva from "@/assets/ali.png";
import tinoKuva from "@/assets/tino.jpg";
import vainoKuva from "@/assets/vaino.png";

const divStyle = {
  color: "white",
  width: "200px",
  height: "200px",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

const picStyle = {
  width: "35px",
  height: "30px",
  borderRadius: "50%",
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
      score: -40,
    },
  ];

  return (
    <div style={divStyle}>
      <table>
        <tbody>
          {users.slice(0, showAll ? users.length : 3).map((users) => (
            <tr key={users.id}>
              <td>
                <img style={picStyle} src={users.picture} alt={users.name} />
              </td>
              <td>{users.name}</td>
              <td>{users.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "^" : "..."}
      </button>
    </div>
  );
};

export default TopUsersTable;
