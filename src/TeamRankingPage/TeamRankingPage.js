import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Table } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000/api";

const TeamRankingPage = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeamData = useCallback(async () => {
    try {
      const teamResponse = await axios.get(`${API_BASE_URL}/teams/rating`);
      if (teamResponse.data.success) setTeamData(teamResponse.data.data);

    } catch (error) {
      console.error("Error fetching team data:", error);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!teamData)
    return (
      <p className="text-center mt-5">팀 정보를 불러오는 데 실패했습니다.</p>
    );

  return (
    <div className="info-board">
      <h2 className="mb-4">팀 랭킹</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>이름</th>
            <th>경기</th>
            <th>승</th>
            <th>무</th>
            <th>패</th>
            <th>득점</th>
            <th>실점</th>
            <th>득실</th>
            <th>레이팅</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team) => (
            <tr key={team.id}>
              <td>{team.team_name}</td>
              <td>{team.games}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goals_for}</td>
              <td>{team.goals_against}</td>
              <td>{team.goals_difference}</td>
              <td>{team.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeamRankingPage;
