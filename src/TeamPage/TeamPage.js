import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import TeamInfo from "./TeamInfo";
import TeamMembers from "./TeamMembers";
import MatchSchedule from "./MatchSchedule";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import JoinStatusTable from "./JoinStatusTable";

const API_BASE_URL = "http://localhost:3000/api";

const TeamPage = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamSchedules, setTeamSchedules] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // 👈 로그인한 사용자
  const [joinRequested, setJoinRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  // 유저 정보 가져오기
  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data.data);
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
    }
  }, []);

  // 팀/멤버/스케줄 불러오기
  const fetchTeamData = useCallback(async () => {
    try {
      const teamResponse = await axios.get(
        `${API_BASE_URL}/teams/${teamId}/detail`
      );
      if (teamResponse.data.success) setTeamData(teamResponse.data.data);

      const membersResponse = await axios.get(
        `${API_BASE_URL}/teams/${teamId}/members`
      );
      if (membersResponse.data.success)
        setTeamMembers(membersResponse.data.data);

      const schedulesResponse = await axios.get(
        `${API_BASE_URL}/team-schedule/${teamId}`
      );
      if (schedulesResponse.data.success)
        setTeamSchedules(schedulesResponse.data.data);
    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  // 가입 신청 핸들러
  const handleJoinRequest = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다!");
      navigate("/login", { state: { from: location.pathname } }); // 로그인 후 되돌아오게
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/teams/${teamId}/join`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJoinRequested(true);
    } catch (err) {
      console.error("가입 신청 실패", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchTeamData();
  }, [fetchCurrentUser, fetchTeamData]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!teamData)
    return (
      <p className="text-center mt-5">팀 정보를 불러오는 데 실패했습니다.</p>
    );

  const isCaptain = currentUser && teamData.captain?.id === currentUser.id;
  const isMember = teamMembers.some((member) => member.id === currentUser?.id);

  return (
    <>
      <Header />
      <Container className="my-4">
        <Row>
          <Col md={6}>
            <TeamInfo team={teamData} />
          </Col>
          <Col md={6}>
            <TeamMembers team={teamData} members={teamMembers} />
          </Col>
        </Row>

        <Row className="my-4">
          <Col>
            <MatchSchedule matches={teamSchedules} />
          </Col>
        </Row>

        {/* ✅ 하단에 권한별 동작 */}
        <Row className="mt-4">
          <Col className="text-center">
            {!isCaptain && !isMember && (
              <Button variant="success" onClick={handleJoinRequest}>
                ⚽ 팀 가입 신청
              </Button>
            )}

            {joinRequested && (
              <Alert variant="info" className="mt-2">
                가입 신청이 완료되었습니다.
              </Alert>
            )}

            {isCaptain && (
              <Row className="mt-4">
                <Col>
                  <JoinStatusTable
                    teamId={teamId}
                    onUpdate={fetchTeamData}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeamPage;
