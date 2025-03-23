import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import TeamInfo from "./TeamInfo";
import TeamMembers from "./TeamMembers";
import MatchSchedule from "./MatchSchedule";
import { Container, Row, Col } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000/api";

const TeamPage = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamSchedules, setTeamSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamResponse = await axios.get(`${API_BASE_URL}/teams/${teamId}/detail`);
        if (teamResponse.data.success) {
          setTeamData(teamResponse.data.data);
        }

        const membersResponse = await axios.get(`${API_BASE_URL}/teams/${teamId}/members`);
        if (membersResponse.data.success) {
          setTeamMembers(membersResponse.data.data);
        }

        const schedulesResponse = await axios.get(`${API_BASE_URL}/team-schedule/${teamId}`);
        if (schedulesResponse.data.success) {
          setTeamSchedules(schedulesResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!teamData) return <p className="text-center mt-5">팀 정보를 불러오는 데 실패했습니다.</p>;

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
        <Row>
          <Col>
            <MatchSchedule matches={teamSchedules} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TeamPage;
