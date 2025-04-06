import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000/api";

const MatchResultForm = ({ match, onResultSubmit }) => {
  const [hostScore, setHostScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");

  useEffect(() => {
    if (match.result) {
      setHostScore(match.result.host_score);
      setOpponentScore(match.result.opponent_score);
    }
  }, [match.result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.patch(
        `${API_BASE_URL}/matches/${match.match_id}/result`,
        {
          host_score: parseInt(hostScore),
          opponent_score: parseInt(opponentScore),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("경기 결과가 저장되었습니다.");
      if (onResultSubmit) onResultSubmit();
    } catch (err) {
      alert("결과 저장 실패");
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <h5>📊 경기 결과 {match.result ? "수정" : "입력"}</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>{match.host_team.team_name} 점수</Form.Label>
          <Form.Control
            type="number"
            value={hostScore}
            onChange={(e) => setHostScore(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>
            {match.opponent_team
              ? match.opponent_team.team_name
              : "상대팀"}{" "}
            점수
          </Form.Label>
          <Form.Control
            type="number"
            value={opponentScore}
            onChange={(e) => setOpponentScore(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          결과 {match.result ? "수정" : "저장"}
        </Button>
      </Form>
    </div>
  );
};

export default MatchResultForm;
