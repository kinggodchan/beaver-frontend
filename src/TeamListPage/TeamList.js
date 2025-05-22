import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TeamCard from "./TeamCard";

const TeamList = ({ teams }) => {
  return (
    <Container className="my-4">
      <Row>
        {teams.map((team) => (
          <Col key={team.team_id} xs={12} sm={6} md={4} lg={3}>
            <TeamCard team={team} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamList;
