import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import soccerImage from './soccer.png';
import MenuPage from '../MenuPage/MenuPage';

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const logos = [
    '/logos/디즈니.svg',
    '/logos/유튜브.svg',
    '/logos/구글.svg',
    '/logos/넷플릭스.svg',
  ];

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
          <img src={soccerImage} alt="Soccer" className="main-image" />
        </div>
      )}

      {/* 브랜드 로고 슬라이더 */}
      <footer className="footer">
        <div className="brand-logos">
          <motion.div
            className="logo-track"
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 10,
                ease: 'linear',
              },
            }}
          >
            {logos.concat(logos).map((logo, index) => (
              <img key={index} src={logo} alt={`logo-${index}`} className="logo" />
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
