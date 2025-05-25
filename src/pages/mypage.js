import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./mypage.css";

const API_BASE_URL = "http://localhost:3000/api";

const MyPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCurrentUser(res.data.data);
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <span className="user-name">🧑‍🦱 {isLoggedIn ? currentUser.username : "홍길동"}</span>
        <span className="user-location">📍 지역: {isLoggedIn ? currentUser.location || "세종" : "일본"}</span>
      </div>

      <div className="mypage-main">
        <div className="profile-box">
          <img src="/soccer.png" alt="프로필" className="profile-image" />
        </div>
        <div className="schedule-box">
          <div className="schedule-content">
            <span className="calendar-icon">🗓</span>
            최근 경기 일정: <strong>2025.05.18</strong>
          </div>
        </div>
      </div>

      <div className="menu-box">
        <ul className="menu-list">
          <li>👥 <Link to={`/team/${currentUser.teamId}`}>나의 팀</Link></li>
          <li>🙍‍♂️ <Link to="/edit-profile">프로필 수정</Link></li>
          <li>⚙ <Link to="/settings">설정</Link></li>
          <li>📰 <Link to="/board/information">매거진</Link></li>
          <li>❓ <Link to="/inquiry">문의사항</Link></li>
          {isLoggedIn && (
            <li className="logout">
              🔓 <button onClick={handleLogoutClick}>로그아웃</button>
            </li>
          )}
        </ul>
      </div>

      {!isLoggedIn && (
        <div className="auth-links">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
