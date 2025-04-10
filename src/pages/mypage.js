import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../component/Header";
import "./mypage.css";

const MyPage = () => {
  const navigate = useNavigate();

  // 로그인 상태 확인
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  // 예시 사용자 정보 (실제로는 props 또는 API로 받아올 수 있음)
  const user = {
    name: "홍길동",
    level: "실력 프로",
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken"); // 토큰 제거
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="mypage-container">
      <Header />
      <div className="mypage-content">
        <div className="user-info-section">
          <img src="/image-11.png" alt="유저 이미지" className="player-image" />
          <div className="user-name">{isLoggedIn ? user.name : "게스트"}</div>
          <div className="user-role">{isLoggedIn ? user.level : "실력 프로"}</div>
          <div className="latest-match-box">최근 경기 일정 : 2025.03.02</div>
        </div>

        <div className="menu-box">
          <ul>
            <li><img src="/users.png" alt="icon" /> <Link to="/my-team">나의 팀</Link></li>
            <li><img src="/user.png" alt="icon" /> <Link to="/edit-profile">프로필 수정</Link></li>
            <li><span role="img" aria-label="설정">⚙️</span> <Link to="/settings">설정</Link></li>
            <li><span>K</span> <Link to="/about">킥오프 소개</Link></li>
            <li><span role="img" aria-label="매거진">📘</span> <Link to="/board/information">매거진</Link></li>
            <li><span role="img" aria-label="문의">💬</span> <Link to="/inquiry">문의 사항</Link></li>

            {isLoggedIn && (
              <li>
                <button className="logout-button" onClick={handleLogoutClick}>
                  로그아웃
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="auth-section">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
