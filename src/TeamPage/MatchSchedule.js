import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const MatchSchedule = ({ matches }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">📅 경기 일정</Card.Header>
      <Card.Body>
        {matches.length > 0 ? (
          <ListGroup variant="flush">
            {matches.map((match, index) => (
              <ListGroup.Item key={index}>
                <p><strong>⚽ 상대팀:</strong> {match.opponent || "모집중"}</p>
                <p><strong>📅 날짜:</strong> {match.match_date}</p>
                <p><strong>📍 장소:</strong> {match.location}</p>
                <p><strong>📊 결과:</strong> {match.result || "예정"}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card.Text>경기 일정이 없습니다.</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default MatchSchedule;
