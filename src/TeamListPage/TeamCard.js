import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${team.team_id}`);
  };

  return (
    <Card className="mb-4 shadow-sm team-card" style={{ cursor: "pointer" }} onClick={handleClick}>
      <Card.Img
        variant="top"
        src={team.team_logo}
        alt={team.team_name}
        style={{ height: "180px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title>{team.team_name}</Card.Title>
        <Card.Text>
          {team.location} | 멤버 {team.member_count}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;
