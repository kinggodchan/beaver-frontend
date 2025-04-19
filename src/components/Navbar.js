import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#myNavbar"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">KICK OFF</a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
			      <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                팀 <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/team">팀 목록</Link></li>
                <li><Link to="/teamMatch">팀 추천</Link></li>
                <li><Link to="/teamRanking">팀 랭킹</Link></li>
                <li><Link to="/match">경기 목록</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                게시판 <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/board/information">정보 게시판</Link></li>
                <li><Link to="/board/trade">장터 게시판</Link></li>
              </ul>
            </li>
            <li><Link to="/contact">문의하기</Link></li>
            {!isLoggedIn ? (
              <>
              <li><Link to="/signup">회원가입</Link></li>
              <li><Link to="/login">로그인</Link></li>
              </>
            ):(
              <li><Link to="/mypage">내 정보</Link></li>
            )
            }
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
