import React from "react";

const TeamMembers = ({ captain, players }) => {
  return (
    <div className="team-members">
      <h3>주장 {captain}</h3>
      <h4>멤버</h4>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
