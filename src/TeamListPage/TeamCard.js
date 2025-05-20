import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${team.team_id}`);
  };

  return (
    <Card className="mb-4 shadow-sm team-card" style={{ cursor: "pointer" , margin: "10px 0px"}} onClick={handleClick}>
      <Card.Img
        variant="top"
        src={team.team_logo}
        alt={team.team_name}
        style={{ height: "200px",width: "100%", padding: "1rem", objectFit: "contain" }}
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
