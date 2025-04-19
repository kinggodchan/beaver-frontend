import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/matches";

const MatchCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    match_date: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const matchId = res.data.data.match_id;
      navigate(`/match/${matchId}`); // 생성된 경기 상세 페이지로 이동 (또는 목록으로)
    } catch (err) {
      console.error("경기 생성 실패", err);
      setError("경기 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <Card>
          <Card.Body>
            <h4 className="mb-4">🏟️ 경기 생성</h4>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleCreateMatch}>
              <Form.Group className="mb-3">
                <Form.Label>경기 날짜 및 시간</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="match_date"
                  value={form.match_date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>장소</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="예: 서울 잠실구장"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                경기 등록
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default MatchCreatePage;
