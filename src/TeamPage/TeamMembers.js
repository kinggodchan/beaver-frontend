import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const TeamMembers = ({ team, members }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">👑 팀 주장</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          {team.captain ? (
            <div>
              <strong>{team.captain.username}</strong>
            </div>
          ) : (
            <div>주장이 없습니다.</div>
          )}
        </ListGroup.Item>
      </ListGroup>

      <Card.Header as="h5">👥 팀 멤버</Card.Header>
      <ListGroup variant="flush">
        {members.length === 0 ? (
          <ListGroup.Item>아직 멤버가 없습니다.</ListGroup.Item>
        ) : (
          members.map((member) => (
            <ListGroup.Item key={member.user_id}>
              <strong>{member.username}</strong> {member.position && `| ${member.position}`}
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default TeamMembers;
