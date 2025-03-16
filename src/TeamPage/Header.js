import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <button>MENU+</button>
      <h1>KICK OFF</h1>
      <div>
        <button>회원가입</button>
        <button>로그인</button>
      </div>
    </header>
  );
};

export default Header;
