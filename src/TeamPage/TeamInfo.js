import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

const TeamInfo = ({ team, rating }) => {
  return (
    <Card className="mb-4">
      <Row className="g-0">
        <Col md={4} className="d-flex align-items-center justify-content-center p-3">
          <Image
            src={team.team_logo}
            alt={`${team.team_name} 로고`}
            fluid
            style={{ maxHeight: "160px", objectFit: "contain" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <h3><strong>{team.team_name}</strong></h3>
            <Card.Text><strong>지역:</strong> {team.location}</Card.Text>
            <Card.Text><strong>멤버 수:</strong> {team.member_count}</Card.Text>
            <Card.Text><strong>소개:</strong> {team.description}</Card.Text>
            <Card.Text><strong>전적:</strong> {rating.wins}/{rating.draws}/{rating.losses}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default TeamInfo;
