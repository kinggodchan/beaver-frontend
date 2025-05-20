import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamCard from "./TeamCard";
import "./TeamList.css"

const TeamList = ({ teams }) => {
  return (
    <container class="teamlistcontainer">
      <Row>
        {teams.map((team) => (
          <Col key={team.team_id} xs={12} sm={6} md={4} lg={3}>
            <TeamCard team={team} />
          </Col>
        ))}
      </Row>
    </container>
  );
};

export default TeamList;
