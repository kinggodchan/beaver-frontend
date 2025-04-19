import React from "react";

const Navbar = () => {
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
                <li><a href="/team">팀 목록</a></li>
                <li><a href="/teamMatch">팀 추천</a></li>
                <li><a href="/teamRanking">팀 랭킹</a></li>
                <li><a href="/match">경기 목록</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                게시판 <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><a href="/board/information">정보 게시판</a></li>
                <li><a href="/board/trade">장터 게시판</a></li>
              </ul>
            </li>
            <li><a href="/contact">문의하기</a></li>
            {/* {!isLoggedIn ? (
              <>
              <li><a href="/signup">회원가입</a></li>
              <li><a href="/login">로그인</a></li>
              </>
            ):(
              <li><a href="/mypage">내 정보</a></li>
            )
            } */}
            <li><a href="#"><span className="glyphicon glyphicon-search"></span></a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
