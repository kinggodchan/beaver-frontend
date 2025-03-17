import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./MenuPage/MenuPage";
import InformationBoard from "./boards/InformationBoard";
import TradeBoard from "./boards/TradeBoard";
import HomePage from "./Homepage/HomePage";
import ContactPage from "./contact/ContactPage"; // ✅ ContactPage 경로 변경


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} /> {/* 메인 페이지 */}
      <Route path="/menu" element={<MenuPage />} /> {/* 메뉴 페이지 */}
      <Route path="/board/information" element={<InformationBoard />} /> {/* 정보 게시판 */}
      <Route path="/board/trade" element={<TradeBoard />} /> {/* 거래 게시판 */}
      <Route path="/contact" element={<ContactPage />} /> {/* ✅ ContactPage 추가 */}
      <Route path="/contact" element={<ContactPage />} /> 
    </Routes>
  );
}

export default App;
