import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/Header";

const API_URL = "http://localhost:3000/api/auth/signin";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backTo = location.state?.from || "/"; // 이전 위치 or 홈

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, form); // 간결하게 작성
      const token = res.data.data.accessToken;
      localStorage.setItem("accessToken", token);
      navigate(backTo); // 이전 페이지로 이동
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5" style={{ maxWidth: "500px" }}>
        <Card>
          <Card.Body>
            <h3 className="mb-4">🔐 로그인</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>이메일</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                로그인
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
