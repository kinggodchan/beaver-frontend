import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

const MatchCard = ({ match }) => {
  const isWaiting = match.status === "WAITING";

  const statusText = isWaiting ? "신청 가능" : "마감";
  const statusVariant = isWaiting ? "primary" : "secondary";

  const time = new Date(match.match_date).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={2} className="text-center">
            <h5>{time}</h5>
          </Col>
          <Col xs={7}>
            <div className="fw-bold">{match.location}</div>
            <div>
              {match.host_team_name}
              {match.opponent_team_name
                ? ` vs ${match.opponent_team_name}`
                : ""}
            </div>
          </Col>
          <Col xs={3} className="text-end">
            <Badge bg={statusVariant} className="p-2">
              {statusText}
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MatchCard;
