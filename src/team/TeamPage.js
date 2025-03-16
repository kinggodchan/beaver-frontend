import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // URL 파라미터 사용
import axios from "axios"; // axios import
import TeamInfo from "./TeamInfo";
import Header from "./Header";
import "./TeamPage.css";

const API_BASE_URL = "http://localhost:3000/api/teams"; // 백엔드 API 주소

const TeamPage = () => {
  const { teamId } = useParams(); // URL에서 teamId 가져오기
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // 팀 상세 정보 가져오기 (axios 사용)
        const teamResponse = await axios.get(`${API_BASE_URL}/${teamId}/detail`);
        const teamResult = teamResponse.data;

        if (teamResult.success) {
          setTeamData(teamResult.data);
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
      </div>
    </div>
  );
};

export default TeamPage;
