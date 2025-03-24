import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./MenuPage/MenuPage";
import PostBoard from "./boards/PostBoard";
import TradeBoard from "./boards/TradeBoard";
import HomePage from "./Homepage/HomePage";
import TeamPage from "./TeamPage/TeamPage";
import TeamListPage from "./TeamListPage/TeamListPage";
import ContactPage from "./contact/ContactPage";
import PostDetail from "./boards/PostDetail";  // ✅ 추가

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
      <Route path="/menu" element={<MenuPage />} /> {/* 메뉴 페이지 */}
      <Route path="/team" element={<TeamListPage />} /> {/* 팀 리스트 페이지 */}
      <Route path="/team/:teamId" element={<TeamPage />} /> {/* 팀 세부 페이지 */}
      <Route path="/board/information" element={<PostBoard />} /> {/* 정보 게시판 */}
      <Route path="/board/information/:id" element={<PostDetail />} /> {/* ✅ 게시글 상세 페이지 */}
      <Route path="/board/trade" element={<TradeBoard />} /> {/* 거래 게시판 */}
      <Route path="/contact" element={<ContactPage />} /> {/* ✅ 중복 제거된 ContactPage */}
    </Routes>
  );
}

export default App;
