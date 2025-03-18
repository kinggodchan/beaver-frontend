import React from "react";
import TeamCard from "./TeamCard";
import "./TeamList.css"; // 스타일 추가

const TeamList = ({ teams }) => {
  return (
    <div className="team-list">
      {teams.map((team) => (
        <TeamCard key={team.team_id} team={team} />
      ))}
    </div>
  );
};

export default TeamList;
