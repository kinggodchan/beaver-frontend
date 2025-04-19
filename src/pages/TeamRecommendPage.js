import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TeamRecommendPage.css';
import Header from "../component/Header";

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    ▶
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    ◀
  </div>
);

const TeamRecommendPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [recommendedTeams, setRecommendedTeams] = useState([]);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3000/api/auth/current-user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null));
    }
  }, [token]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/teams/recommend/by-wins')
      .then((res) => setRecommendedTeams(res.data.data))
      .catch((err) => console.error("추천 팀 가져오기 실패", err));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <>
      <Header />
      <div className="team-recommend-page">

        {/* 좌측 유저 정보 */}
        <div className="left-section">
          <h2>{currentUser ? `${currentUser.username}님` : '님님님'}</h2>
          <img
            src="/images/beaver-icon.png"
            alt="유저 아이콘"
            className="beaver-icon"
          />
          <p>오늘의 추천 팀을 확인해보세요!</p>
        </div>

        {/* 우측 추천 팀 슬라이더 */}
        <div className="right-section">
          <h3>당신을 위한 팀 추천 리스트</h3>
          <Slider {...sliderSettings}>
            {recommendedTeams.map((team) => (
              <div key={team.team_id} className="team-card">
                <img
                  src={team.team_logo}
                  alt={team.team_name}
                  className="team-logo"
                />
                <h4>{team.team_name}</h4>
                <p>{team.description}</p>
                <p>멤버 수 : {team.member_count}명</p>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </>
  );
};

export default TeamRecommendPage;
