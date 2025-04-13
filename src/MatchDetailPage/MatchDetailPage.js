import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import MatchJoinRequestList from "./MatchJoinRequestList";
import MatchResultForm from "./MatchResultForm";

const API_BASE_URL = "http://localhost:3000/api";

const MatchDetailPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [match, setMatch] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMatchDetail = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
      setMatch(res.data.data);
    } catch (err) {
      console.error("경기 정보 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data.data);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  const handleJoinMatch = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/matches/${matchId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("참가 신청이 완료되었습니다.");
      fetchMatchDetail();
    } catch (err) {
      alert("이미 신청했거나 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchMatchDetail();
  }, [fetchMatchDetail]);

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (!match)
    return <Alert variant="danger">경기 정보를 불러올 수 없습니다.</Alert>;

  const isHostCaptain =
    currentUser && currentUser.id === match.host_team.captain.id;
  const isOpponentCaptain =
    currentUser &&
    match.opponent_team &&
    currentUser.id === match.opponent_team.captain.id;

  const formatDate = new Date(match.match_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  const formatTime = new Date(match.match_date).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Container className="my-4">
        <h3>📋 경기 상세 정보</h3>
        <Card>
          <Card.Body>
            <Row>
              <Col md={6}>
                <p>
                  <strong>📅 날짜:</strong> {formatDate} {formatTime}
                </p>
                <p>
                  <strong>📍 장소:</strong> {match.location}
                </p>
                <p>
                  <strong>⚽ 경기:</strong> {match.host_team.team_name}
                  {match.opponent_team
                    ? ` vs ${match.opponent_team.team_name}`
                    : " (상대팀 미정)"}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>상태:</strong>{" "}
                  <Badge
                    bg={match.status === "WAITING" ? "primary" : "secondary"}
                  >
                    {match.status === "WAITING" ? "신청 가능" : "마감"}
                  </Badge>
                </p>
                {match.result && (
                  <p>
                    <strong>📊 결과:</strong>{" "}
                    {match.result.host_score} : {match.result.opponent_score}
                  </p>
                )}
              </Col>
            </Row>

            {/* ✅ 참가 신청 버튼 */}
            {currentUser &&
              !isHostCaptain &&
              !isOpponentCaptain &&
              match.status === "WAITING" && (
                <div className="mt-4 text-center">
                  <Button variant="success" onClick={handleJoinMatch}>
                    ⚽ 경기 참가 신청
                  </Button>
                </div>
              )}

          </Card.Body>
        </Card>
            {/* ✅ 주최팀 주장 전용 UI */}
            {isHostCaptain && (
              <>
                <MatchJoinRequestList matchId={matchId} onUpdate={fetchMatchDetail} />
              {
                <MatchResultForm match={match} onResultSubmit={fetchMatchDetail} />
              }
              </>
            )}
      </Container>
    </>
  );
};

export default MatchDetailPage;
