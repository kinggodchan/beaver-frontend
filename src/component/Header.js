import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToMenu = () => {
    navigate("/menu", { state: { from: location.pathname } }); // 현재 경로 전달
  };

  return (
    <header className="header">
      <h1 onClick={goToMenu} style={{ cursor: 'pointer' }}>MENU+</h1>
      <nav>
      <h2 className="kick-off"><a href="/">KICK OFF</a></h2>
        <a href="/signup">회원가입</a>
        <a href="/login">로그인</a>
      </nav>
    </header>
  );
};

export default Header;
