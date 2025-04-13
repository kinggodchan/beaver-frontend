import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    gender: "남자",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleGenderChange = (gender) => {
    setForm({ ...form, gender });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직
    setError("회원가입이 완료되었습니다!"); // 여기에서 실제 로직 추가
  };

  return (
    <>
      <Container className="signup-container">
        <Card className="signup-card">
          <Card.Body>
            <h3 className="signup-title">회원가입</h3>

            {error && <Alert variant="success">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
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
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="전화번호를 입력하세요"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>주소</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="주소를 입력하세요"
                  required
                />
              </Form.Group>

              <Form.Label>성별</Form.Label>
              <div className="gender-selection">
                <Button
                  variant={form.gender === "남자" ? "dark" : "light"}
                  onClick={() => handleGenderChange("남자")}
                >
                  남자
                </Button>
                <Button
                  variant={form.gender === "여자" ? "dark" : "light"}
                  onClick={() => handleGenderChange("여자")}
                >
                  여자
                </Button>
              </div>

              <Button type="submit" variant="primary" className="mt-3 w-100">
                회원가입
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Signup;
