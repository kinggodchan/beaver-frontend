import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
//import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const goToMenu = () => navigate("/menu", { state: { from: location.pathname } });
  const goToLogin = () => navigate("/login", { state: { from: location.pathname } });
  const goToSignup = () => navigate("/signup", { state: { from: location.pathname } });
  const goToMyPage = () => navigate("/mypage");

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={goToMenu} style={{ cursor: "pointer", fontWeight: "bold" }}>
          MENU+
        </Navbar.Brand>

        <Nav className="mx-auto">
          <Navbar.Text style={{ fontSize: "24px", fontWeight: "bold" }}>
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              KICK OFF
            </a>
          </Navbar.Text>
        </Nav>

        <Nav>
  {!isLoggedIn ? (
    <>
      <Nav.Link onClick={goToSignup} style={{ cursor: "pointer" }}>
        회원가입
      </Nav.Link>
      <Nav.Link onClick={goToLogin} style={{ cursor: "pointer" }}>
        로그인
      </Nav.Link>
    </>
  ) : (
    // 로그인 후: 아이콘 클릭 시 마이페이지 이동
    <Nav.Link onClick={goToMyPage} style={{ cursor: "pointer" }}>
    <i className="bi bi-person-circle" style={{ fontSize: "1.8rem" }}></i>
    </Nav.Link>

  )}
</Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
