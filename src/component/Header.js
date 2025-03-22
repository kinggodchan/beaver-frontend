// src/components/Header.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToMenu = () => {
    navigate("/menu", { state: { from: location.pathname } });
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* 왼쪽: 메뉴 버튼 */}
        <Navbar.Brand onClick={goToMenu} style={{ cursor: "pointer", fontWeight: "bold" }}>
          MENU+
        </Navbar.Brand>
          {/* 중앙: KICK OFF 텍스트 */}
          <Nav className="mx-auto">
            <Navbar.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>KICK OFF</a>
            </Navbar.Text>
          </Nav>

          {/* 오른쪽: 회원가입 / 로그인 */}
          <Nav>
            <Nav.Link href="/signup">회원가입</Nav.Link>
            <Nav.Link href="/login">로그인</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
