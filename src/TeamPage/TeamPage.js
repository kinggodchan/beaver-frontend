import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeamInfo from "./TeamInfo";
import TeamMembers from "./TeamMembers"; // 멤버 컴포넌트 추가
import Header from "../component/Header";
import "./TeamPage.css";

const API_BASE_URL = "http://localhost:3000/api/teams";

const TeamPage = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]); // 멤버 목록 상태 추가
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // 팀 상세 정보 가져오기
        const teamResponse = await axios.get(
          `${API_BASE_URL}/${teamId}/detail`
        );
        if (teamResponse.data.success) {
          setTeamData(teamResponse.data.data);
        }

        // 팀 멤버 정보 가져오기
        const membersResponse = await axios.get(
          `${API_BASE_URL}/${teamId}/members`
        );
        if (membersResponse.data.success) {
          setTeamMembers(membersResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!teamData) {
    return <p>팀 정보를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div>
      <Header />
      <div className="team-container">
        <TeamInfo team={teamData} />
        <TeamMembers team={teamData} members={teamMembers} /> {/* 팀 멤버 목록 표시 */}
      </div>
    </div>
  );
};

export default TeamPage;
