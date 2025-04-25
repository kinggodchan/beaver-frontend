import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const API_URL = "http://localhost:3000/api/auth/signin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, form);
      const { accessToken, user } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      <Container className="login-container">
        <Card className="login-card">
          <Card.Body>
            <h3 className="login-title">🔐 로그인</h3>
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
              <Form.Group className="mb-4">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="dark" className="w-100">
                로그인
              </Button>
            </Form>
            <div className="login-links mt-3">
              <Link to="/find-email">아이디 찾기</Link> |{" "}
              <Link to="/password/enter-email">비밀번호 찾기</Link> |{" "}
              <Link to="/signup">회원가입</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
