import React from "react";
import { motion } from "framer-motion";
import "../Homepage/HomePage.css";
import soccerImage from "../soccer.png";
import Header from "../component/Header";

const HomePage = () => {
  const logos = [
    "/logos/디즈니.svg",
    "/logos/유튜브.svg",
    "/logos/구글.svg",
    "/logos/넷플릭스.svg",
  ];

  return (
    <div className="homepage">
      <Header />

      <div className="main-content">
        <img src={soccerImage} alt="Soccer" className="main-image" />
      </div>
      {/* 브랜드 로고 슬라이더 */}
      <footer className="footer">
        <div className="brand-logos">
          <motion.div
            className="logo-track"
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
          >
            {logos.concat(logos).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`logo-${index}`}
                className="logo"
              />
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
