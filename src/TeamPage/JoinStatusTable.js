import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert } from "react-bootstrap";

const API_BASE_URL = "http://localhost:3000/api";

const JoinStatusTable = ({ teamId, onUpdate }) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetchStatuses
  const fetchStatuses = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/teams/${teamId}/join/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatuses(res.data.data);
    } catch (err) {
      console.error("목록 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchStatuses();
  }, [fetchStatuses]);

  const handleDecision = async (joinId, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/teams/${teamId}/join/${joinId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchStatuses();
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("처리 실패", err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (statuses.length === 0)
    return <Alert variant="info">신청 내역이 없습니다.</Alert>;

  // ✅ 상태만 반환
  const renderStatus = (status) => {
    if (status === "PENDING") return "⏳ 대기 중";
    if (status === "APPROVED") return "✅ 수락됨";
    if (status === "REJECTED") return "❌ 거절됨";
    return "-";
  };

  // ✅ 버튼만 반환
  const renderActions = (app) => {
    const buttons = [];
    if (app.status === "PENDING") {
      buttons.push(
        <Button
          key="approve"
          size="sm"
          variant="success"
          className="me-2"
          onClick={() => handleDecision(app.join_id, "APPROVED")}
        >
          수락
        </Button>
      );
      buttons.push(
        <Button
          key="reject"
          size="sm"
          variant="danger"
          onClick={() => handleDecision(app.join_id, "REJECTED")}
        >
          거절
        </Button>
      );
    }

    if (app.status === "REJECTED") {
      buttons.push(
        <Button
          key="approve"
          size="sm"
          variant="success"
          onClick={() => handleDecision(app.join_id, "APPROVED")}
        >
          수락
        </Button>
      );
    }

    if (app.status === "APPROVED") {
      buttons.push(
        <Button
          key="reject"
          size="sm"
          variant="danger"
          onClick={() => handleDecision(app.join_id, "REJECTED")}
        >
          추방
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4">
      <h5>📋 가입 신청 내역</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>사용자</th>
            <th>이메일</th>
            <th>신청일</th>
            <th>처리일</th>
            <th>상태</th>
            <th>상태변경</th> {/* ✅ 새로운 열 추가 */}
          </tr>
        </thead>
        <tbody>
          {statuses.map((app) => (
            <tr key={app.join_id}>
              <td>{app.user.username}</td>
              <td>{app.user.email}</td>
              <td>{new Date(app.created_at).toLocaleString()}</td>
              <td>
                {app.modified_at
                  ? new Date(app.modified_at).toLocaleString()
                  : "-"}
              </td>
              <td>{renderStatus(app.status)}</td>
              <td>{renderActions(app)}</td> {/* ✅ 버튼만 따로 표시 */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default JoinStatusTable;
