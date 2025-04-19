import React, { useState, useEffect, useCallback} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./mypage.css";

const API_BASE_URL = "http://localhost:3000/api";

const MyPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  // 로그인 상태 확인
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;

  const fetchCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data.data);
    } catch (err) {
      console.error("사용자 정보 조회 실패:", err);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken"); // 토큰 제거
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="mypage-container">
      <div className="mypage-content">
        <div className="user-info-section">
          {/* <img src="/image-11.png" alt="유저 이미지" className="player-image" /> */}
          <div className="user-name">{isLoggedIn ? currentUser.username : "게스트"}</div>
          <div className="user-role">지역 {isLoggedIn ? currentUser.location ? currentUser.location : "세종" : "세종"}</div>
          <div className="latest-match-box">최근 경기 일정 : 2025.03.02</div>
        </div>

        <div className="menu-box">
          <ul>
            <li><img src="/users.png" alt="icon" /> <Link to="/my-team">나의 팀</Link></li>
            <li><img src="/user.png" alt="icon" /> <Link to="/edit-profile">프로필 수정</Link></li>
            <li><span role="img" aria-label="설정">⚙️</span> <Link to="/settings">설정</Link></li>
            <li><span> K</span> <Link to="/about">킥오프 소개</Link></li>
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
