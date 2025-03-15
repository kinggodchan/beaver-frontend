import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import soccerImage from './soccer.png'; // 경로 수정
import MenuPage from './MenuPage'; // MenuPage 컴포넌트 추가

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false); // 메뉴 표시 상태 추가

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu); // 메뉴 토글
  };

  return (
    <div className="homepage">
      <header className="header">
        <h1 onClick={handleMenuToggle} style={{ cursor: 'pointer' }}>MENU+</h1>
        <h2 className="kick-off">KICK OFF</h2>
        <nav>
          <a href="/signup">회원가입</a>
          <a href="/login">로그인</a>
        </nav>
      </header>
      {showMenu ? (
        <MenuPage onClose={handleMenuToggle} /> 
      ) : (
        <div className="main-content">
          <img src={soccerImage} alt="Soccer" className="main-image" /> {/* soccer.png 적용 */}
        </div>
      )}
      <footer className="footer">
        <div className="brand-logos">
          {/* 브랜드 로고 추가 */}
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
