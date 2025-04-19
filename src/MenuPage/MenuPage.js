import React, { useState, useRef } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./MenuPage.css";

const MenuPage = ({ onClose }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    // location.state?.from 이 있으면 거기로, 없으면 홈으로
    const backTo = location.state?.from || "/";
    navigate(backTo);
  };

  // nodeRef 추가 (각 서브메뉴에 대해 Ref를 생성)
  const teamMenuRef = useRef(null);
  const boardMenuRef = useRef(null);

  return (
    <div className="menu-page">
      <h1 className="close-button" onClick={handleClose}>CLOSE+</h1>
      <ul className="menu-items">
        {/* TEAM 메뉴 */}
        <li onMouseEnter={() => setActiveMenu("team")} onMouseLeave={() => setActiveMenu(null)}>
          TEAM
          <CSSTransition
            in={activeMenu === "team"}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={teamMenuRef}  // Ref 추가
          >
            <ul className="submenu" ref={teamMenuRef}>
              <li><Link to="/team">팀 리스트</Link></li>
              <li><Link to="/team-recommend">팀 추천</Link></li>
              <li><Link to="/team/ranking">팀 랭킹</Link></li>
              <li><Link to="/match">경기 목록</Link></li>
            </ul>
          </CSSTransition>
        </li>

        {/* BOARD 메뉴 */}
        <li onMouseEnter={() => setActiveMenu("board")} onMouseLeave={() => setActiveMenu(null)}>
          BOARD
          <CSSTransition
            in={activeMenu === "board"}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={boardMenuRef}  // Ref 추가
          >
            <ul className="submenu" ref={boardMenuRef}>
              <li><Link to="/board/information">정보 게시판</Link></li>
              <li><Link to="/board/trade">장터 게시판</Link></li>
            </ul>
          </CSSTransition>
        </li>

        <li class="contact"><Link to="/contact">CONTACT</Link></li>
      </ul>
    </div>
  );
};

export default MenuPage;
