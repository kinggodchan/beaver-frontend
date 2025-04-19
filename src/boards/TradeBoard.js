import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Link 추가
import axios from "axios";
import "./PostBoard.css"; // 동일한 스타일 사용

const TradeBoard = () => {
  const [tradePosts, setTradePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/boards/trade-posts")
      .then((response) => {
        setTradePosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error("거래 게시글 불러오기 오류:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = tradePosts.filter((post) => {
      return (
        post.title.includes(searchTerm) &&
        (selectedCategory === "" || post.category === selectedCategory) &&
        (selectedSize === "" || post.size === selectedSize) &&
        post.price >= minPrice &&
        post.price <= maxPrice
      );
    });
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedSize, minPrice, maxPrice, tradePosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="info-board">
        <div className="post-board-container">
          {/* 필터 영역 */}
          <aside className="sidebar">
            <h3>필터</h3>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h4>종류</h4>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">전체</option>
              <option value="조깅화">조깅화</option>
              <option value="전통화">전통화</option>
              <option value="인쇄화">인쇄화</option>
            </select>

            <h4>신발 사이즈</h4>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">전체</option>
              <option value="260">260</option>
              <option value="270">270</option>
              <option value="280">280</option>
            </select>

            <h4>가격 범위</h4>
            <input
              type="range"
              min="1000"
              max="2000000"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="range"
              min="1000"
              max="2000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <p>
              {minPrice.toLocaleString()}원 ~ {maxPrice.toLocaleString()}원
            </p>
          </aside>

          {/* 거래 게시글 목록 */}
          <div className="info-grid">
          {currentPosts.map((post) => (
  <Link
    to={`/boards/trade-posts/${post.trade_post_id}`}  // ✅ 정확한 상세 페이지 경로
    key={post.trade_post_id}
    className="info-card"
    style={{ position: "relative" }}
  >
    <img
      src={post.file}
      alt={post.title}
      className="info-image"
    />
    <div className="info-info">
      <p className="info-category">{post.category}</p>
      <h4 className="info-title">{post.title}</h4>
      <p>{Number(post.price).toLocaleString()}원</p>
    </div>
  </Link>
))}

          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default TradeBoard;
