import React from "react";
import "./TeamInfo.css"; // 스타일 파일 추가

const TeamInfo = ({ team }) => {
  return (
    <div className="team-info">
      <div className="team-logo">
        <img src={team.team_logo} alt={`${team.team_name} 로고`} />
      </div>
      <div className="team-details">
        <h3 className="team-name">{team.team_name}</h3>
        <p><strong>Location:</strong> {team.location}</p>
        <p><strong>Member Count:</strong> {team.member_count}</p>
        <p><strong>Description:</strong> {team.description}</p>
      </div>
    </div>
  );
};

export default TeamInfo;
