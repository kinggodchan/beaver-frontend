import React from "react";

const TeamInfo = ({ team }) => {
  return (
    <div className="team-info">
      <h2>{team.name}</h2>
      <p>멤버 {team.members} | 실력 {team.skillLevel}</p>
      <p>{team.description}</p>
      <h4>팀 규칙</h4>
      <ul>
        {team.rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeamInfo;
