import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MenuPage.css";

const MenuPage = ({ onClose }) => {
  const [isBoardOpen, setIsBoardOpen] = useState(false); // BOARD 메뉴 상태

  return (
    <div className="menu-page">
      <h1 className="close-button" onClick={onClose}>CLOSE+</h1>
      <ul className="menu-items">
        <li><Link to="/team">TEAM</Link></li>

        {/* BOARD에 마우스를 올리면 서브메뉴 열기 */}
        <li 
          onMouseEnter={() => setIsBoardOpen(true)}
          onMouseLeave={() => setIsBoardOpen(false)}
        >
          BOARD
          {isBoardOpen && (
            <ul className="submenu">
              <li><Link to="/board/information">정보 게시판</Link></li>
              <li><Link to="/board/trade">거래 게시판</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/contact">CONTACT</Link></li>
      </ul>
    </div>
  );
};

export default MenuPage;
