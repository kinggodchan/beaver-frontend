import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamList from "./TeamList";
import TeamPagination from "./Pagination";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api/teams";

const TeamListPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 8;

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

  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const navigate = useNavigate();

  return (
    <div>
      <div className="info-board">
        <h2 className="mb-4">팀 목록</h2>
        <div className="teamcreate">
          
          <button
            className="write-button"
            onClick={() => navigate("/team/create")}
          >
            팀 생성
          </button>
          <Form.Control
            type="text"
            placeholder="팀명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "300px", height: "50px" }} // 너비 조절
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : (
        <TeamList teams={currentTeams} />
      )}

      <TeamPagination
        totalTeams={filteredTeams.length}
        teamsPerPage={teamsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TeamListPage;
