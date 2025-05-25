import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MatchSchedule = ({ matches, isCaptain }) => {
  const navigate = useNavigate();

  const handleClick = (match) => {
    navigate(`/match/${match.match_id}`);
  };
  return (
    <Card className="mb-4">
      <Card.Header
        as="h5"
        className="d-flex justify-content-between align-items-center"
      >
        <span>📅 경기 일정</span>

        {/* ✅ 팀 주장만 경기 생성 버튼 표시 */}
        {isCaptain && (
          <Button variant="primary" onClick={() => navigate("/match/create")}>
            + 경기 생성
          </Button>
        )}
      </Card.Header>

      <Card.Body>
        {matches.length > 0 ? (
          <ListGroup variant="flush">
            {matches.map((match, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleClick(match)}
                style={{ cursor: "pointer" }}
              >
                <p>🏟 장소: {match.location}</p>
                <p>
                  🕒 시간:{" "}
                  {new Date(match.match_date).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  ⚽ 대진: {match.host_team.team_name} vs{" "}
                  {match.opponent_team?.team_name || "모집 중"}
                </p>
                <p>
                  📊 결과:{" "}
                  {match.result
                    ? `${match.result.host_score} : ${match.result.opponent_score}`
                    : "예정"}
                </p>
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
