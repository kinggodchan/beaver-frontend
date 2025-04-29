import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const API_URL = "http://localhost:3000/api/auth/signup"; // 회원가입 API 엔드포인트

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    location: "",
    role: "USER",
  });

  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword, phone_number, location } = form;

    if (!username || !email || !password || !confirmPassword || !phone_number || !location) {
      setAlert({ type: "danger", message: "모든 필수 입력란을 채워주세요." });
      return false;
    }

    if (password.length < 8) {
      setAlert({ type: "danger", message: "비밀번호는 최소 8자 이상이어야 합니다." });
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlert({ type: "danger", message: "비밀번호는 소문자, 숫자, 특수문자를 포함해야 합니다." });
      return false;
    }

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
      return false;
    }

    const phoneRegex = /^01[016789]\d{7,8}$/;
    if (!phoneRegex.test(phone_number)) {
      setAlert({ type: "danger", message: "올바른 전화번호 형식이 아닙니다. (예: 01012345678)" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
  
    if (!validateForm()) return;
  
    try {
      const { username, email, password, phone_number, location, role } = form;
      const payload = { username, email, password, phone_number, location, role };
  
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data?.success) {
        setAlert({ type: "success", message: "회원가입이 완료되었습니다! 로그인 페이지로 이동합니다." });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setAlert({ type: "danger", message: "회원가입에 실패했습니다. 다시 시도해주세요." });
      }
    } catch (err) {
      console.error("회원가입 에러:", err);
      const errorMessage = err.response?.data?.message || "서버 오류가 발생했습니다. 나중에 다시 시도하세요.";
      setAlert({ type: "danger", message: errorMessage });
    }
  };
  

  return (
    <Container className="signup-container">
      <Card className="signup-card">
        <Card.Body>
          <h3 className="signup-title">회원가입</h3>

          {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
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
                placeholder="비밀번호를 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>전화번호</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="주소를 입력하세요"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              회원가입
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
