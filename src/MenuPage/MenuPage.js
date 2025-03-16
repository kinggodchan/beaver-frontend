// MenuPage.js
import React from 'react';
import './MenuPage.css'; // 스타일 파일 생성

const MenuPage = ({ onClose }) => {
  return (
    <div className="menu-page">
      <h1 className="close-button" onClick={onClose}>CLOSE+</h1>
      <ul className="menu-items">
        <li>TEAM</li>
        <li>BOARD</li>
        <li>CONTACT</li>
      </ul>
    </div>
  );
};

export default MenuPage;
