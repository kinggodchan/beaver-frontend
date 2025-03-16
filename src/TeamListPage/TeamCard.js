import React from "react";
import { useNavigate } from "react-router-dom";
import "./TeamCard.css";

const TeamCard = ({ team }) => {
  const navigate = useNavigate(); // 네비게이션 함수

  const handleClick = () => {
    navigate(`/team/${team.team_id}`); // 해당 팀의 상세 페이지로 이동
  };

  return (
    <div className="team-card" onClick={handleClick}>
      <img src={team.team_logo} alt={team.team_name} className="team-logo" />
      <h3>{team.team_name}</h3>
      <p>{team.location} | 멤버 {team.member_count}</p>
    </div>
  );
};

export default TeamCard;
