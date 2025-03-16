import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./MenuPage/MenuPage";
import InformationBoard from "./boards/InformationBoard";
import TradeBoard from "./boards/TradeBoard";
import HomePage from './Homepage/HomePage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />   {/* 메인 페이지를 HomePage로 설정 */}
      <Route path="/menu" element={<MenuPage />} />   {/* 메뉴 페이지는 따로 라우팅 */}
      <Route path="/board/information" element={<InformationBoard />} />
      <Route path="/board/trade" element={<TradeBoard />} />
    </Routes>
  );
}

export default App;
