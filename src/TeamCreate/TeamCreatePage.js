import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Alert
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/teams";

const TeamCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    team_name: "",
    location: "",
    description: "",
    team_logo: null,
  });
  const [error, setError] = useState("");

  // ✅ 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login", { state: { from: "/team/create" } });
    }
  }, [navigate]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    setForm({ ...form, team_logo: e.target.files[0] });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      const formData = new FormData();
      formData.append("team_name", form.team_name);
      formData.append("location", form.location);
      formData.append("description", form.description);
      if (form.team_logo) {
        formData.append("image", form.team_logo);
      }

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const createdTeamId = res.data.data.team_id;

      if (createdTeamId) {
        navigate(`/team/${createdTeamId}`);
      } else {
        navigate("/team");
      }
    } catch (err) {
      console.error(err);
      setError("팀 생성에 실패했습니다.");
      //navigate("/team"); // 실패 시 리스트로
    }
  };

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <Card>
          <Card.Body>
            <h3 className="mb-4">⚽ 팀 생성</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>팀 이름</Form.Label>
                <Form.Control
                  type="text"
                  name="team_name"
                  value={form.team_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>지역</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>팀 소개</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>팀 로고 업로드</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                팀 생성
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default TeamCreatePage;
