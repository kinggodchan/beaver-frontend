import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000/api";

const MatchJoinRequestList = ({ matchId, onUpdate }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/matches/${matchId}/join/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.data);
    } catch (err) {
      console.error("신청 목록 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  const handleDecision = async (joinId, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/matches/${matchId}/join/${joinId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("상태 변경 실패", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  if (loading) return <Spinner animation="border" className="my-3" />;
  if (requests.length === 0) return <p className="mt-3">신청 팀이 없습니다.</p>;

  return (
    <div className="mt-4">
      <h5>📬 신청 목록</h5>
      <Table striped bordered>
        <thead>
          <tr>
            <th>팀명</th>
            <th>신청일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.team.team_name}</td>
              <td>{new Date(req.created_at).toLocaleString()}</td>
              <td>{req.status}</td>
              <td>
                {req.status !== "APPROVED" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleDecision(req.id, "APPROVED")}
                  >
                    수락
                  </Button>
                )}
                {req.status !== "REJECTED" && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDecision(req.id, "REJECTED")}
                  >
                    거절
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MatchJoinRequestList;
