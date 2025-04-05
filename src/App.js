import React from "react";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/team" element={<TeamListPage />} />
      <Route path="/team/create" element={<TeamCreatePage />} />
      <Route path="/team/:teamId" element={<TeamPage />} />
      <Route path="/board/information" element={<PostBoard />} />
      <Route path="/board/information/:id" element={<PostDetail />} />
      <Route path="/board/trade" element={<TradeBoard />} />
      <Route path="/boards/trade-posts/:id" element={<TradeDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/match" element={<MatchListPage />} />
      <Route path="/match/create" element={<MatchCreatePage />} />
      <Route path="/match/:matchId" element={<MatchDetailPage />} />
    </Routes>
  );
}

export default App;
