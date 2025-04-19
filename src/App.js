import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./MenuPage/MenuPage";
import PostBoard from "./boards/PostBoard";
import TradeBoard from "./boards/TradeBoard";
import HomePage from "./Homepage/HomePage";
import TeamPage from './TeamPage/TeamPage';
import TeamCreatePage from './TeamCreate/TeamCreatePage';
import TeamListPage from './TeamListPage/TeamListPage';
import ContactPage from "./contact/ContactPage";
import LoginPage from "./LoginPage/LoginPage";
import PostDetail from "./boards/PostDetail";  
import Signup from "./Signup/Signup";
import MatchListPage from "./MatchPage/MatchListPage";
import MatchCreatePage from "./MatchCreatePage/MatchCreatePage";
import MatchDetailPage from "./MatchDetailPage/MatchDetailPage";
import TradeDetail from "./boards/TradeDetail"; 
import InquiryList from "./Inquiry/InquiryList";
import InquiryDetail from "./Inquiry/InquiryDetail";
import MyPage from "./pages/mypage";
import TeamRecommendPage from "./pages/TeamRecommendPage";

function App() {
  // 로그인 상태와 사용자 정보 선언
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 필요시 false로 변경
  const [user, setUser] = useState({ name: "손흥민", level: "실력 프로" });

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/team" element={<TeamListPage />} />
      <Route path="/team/create" element={<TeamCreatePage />} />
      <Route path="/team/:teamId" element={<TeamPage />} />
      <Route path="/board/information" element={<PostBoard />} />
      <Route path="/board/information/:id" element={<PostDetail boardId={1} />} />
      <Route path="/board/trade" element={<TradeBoard />} />
      <Route path="/boards/trade-posts/:id" element={<TradeDetail boardId={2} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/match" element={<MatchListPage />} />
      <Route path="/match/create" element={<MatchCreatePage />} />
      <Route path="/match/:matchId" element={<MatchDetailPage />} />
      <Route path="/team-recommend" element={<TeamRecommendPage/>} />
      <Route path="/inquiry" element={<InquiryList />} />
      <Route path="/inquiry/:id" element={<InquiryDetail />} />
      <Route path="/mypage" element= {<MyPage isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}/>}/>
    </Routes>
  );
}

export default App;
