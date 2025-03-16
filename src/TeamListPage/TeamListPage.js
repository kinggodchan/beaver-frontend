import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamList from "./TeamList";
import Pagination from "./Pagination";
import "./TeamListPage.css";

const API_BASE_URL = "http://localhost:3000/api/teams";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 8; // 한 페이지당 팀 개수

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}`);
        if (response.data.success) {
          setTeams(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // 검색 필터 적용
  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 페이지네이션 처리
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  return (
    <div className="team-list-page">
      <header className="search-container">
        <input
          type="text"
          placeholder="팀명 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      {loading ? <p>Loading...</p> : <TeamList teams={currentTeams} />}

      <Pagination
        totalTeams={filteredTeams.length}
        teamsPerPage={teamsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TeamListPage;
