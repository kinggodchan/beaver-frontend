import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spinner, Alert, Container } from "react-bootstrap";
import Header from "../component/Header";

const API_URL = "http://localhost:3000/api/matches";

const MatchDetailPage = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`${API_URL}/${matchId}`);
        setMatch(res.data.data);
      } catch (err) {
        console.error("경기 정보 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchId]);

  if (loading) return <Spinner animation="border" />;
  if (!match) return <Alert variant="danger">경기 정보를 불러올 수 없습니다.</Alert>;

  return (
    <>
      <Header />
      <Container className="my-4">
        <Card>
          <Card.Body>
            <h4>🏟️ 경기 상세 정보</h4>
            <p><strong>날짜:</strong> {new Date(match.match_date).toLocaleString()}</p>
            <p><strong>장소:</strong> {match.location}</p>
            <p><strong>상태:</strong> {match.status}</p>
            <p><strong>주최팀:</strong> {match.host_team_name}</p>
            <p><strong>상대팀:</strong> {match.opponent_team_name || "모집중"}</p>
            {match.result && (
              <>
                <p><strong>경기 결과:</strong></p>
                <p>{match.result.host_score} : {match.result.opponent_score}</p>
              </>
            )}
            {/* 권한에 따라 버튼 노출 가능 */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MatchDetailPage;
