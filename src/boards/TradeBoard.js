import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "./PostBoard.css";

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
    let filtered = tradePosts.filter((post) => {
      return (
        post.title.includes(searchTerm) &&
        (selectedCategory === "" || post.category === selectedCategory) &&
        (selectedSize === "" || post.size === selectedSize) &&
        post.price >= minPrice &&
        post.price <= maxPrice
      );
    });
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, selectedSize, minPrice, maxPrice, tradePosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="trade-board">
      <Header />
      <div className="container">
        <aside className="sidebar">
          <h3>필터</h3>
          <input
            type="text"
            placeholder="검색..."
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

          <h4>가격 범위</h4>
          <input type="range" min="1000" max="2000000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <input type="range" min="1000" max="2000000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          <p>{minPrice.toLocaleString()}원 - {maxPrice.toLocaleString()}원</p>

          <h4>신발 사이즈</h4>
          <select onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">전체</option>
            <option value="260">260</option>
            <option value="270">270</option>
            <option value="280">280</option>
          </select>
        </aside>

        <div className="content">
          <div className="board-header">
            <h1 className="board-title">거래 게시판</h1>
          </div>
          
          <div className="post-list">
            {currentPosts.map((post) => (
              <div key={post.id} className="post-item">
                <Link to={`/trade-post/${post.id}`}>
                  <img src={post.imageUrl} alt={post.title} />
                  <h2>{post.title}</h2>
                  <p>{post.price.toLocaleString()}원</p>
                </Link>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map(num => (
              <button key={num + 1} onClick={() => setCurrentPage(num + 1)} className={currentPage === num + 1 ? "active" : ""}>
                {num + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeBoard;
