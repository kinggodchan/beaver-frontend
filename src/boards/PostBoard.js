import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostBoard.css";
import Header from "../component/Header";

const PostBoard = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/boards/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "views") {
      return b.views - a.views;
    }
    return 0;
  });

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // ✅ 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="info-board">
      <Header />
      <div className="container">
        <div className="sidebar">
          <h3>정렬</h3>
          <div className="sort-options">
            <label>
              <input
                type="radio"
                name="sort"
                value="latest"
                checked={sortOption === "latest"}
                onChange={() => setSortOption("latest")}
              />
              최신순
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="views"
                checked={sortOption === "views"}
                onChange={() => setSortOption("views")}
              />
              많이 본 순
            </label>
          </div>
        </div>

        <div className="info-grid">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="info-card"
              onClick={() => navigate(`/board/PostBoard/${post.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={post.image} alt={post.title} className="info-image" />
              <div className="info-info">
                <p className="info-category">{post.category}</p>
                <h4 className="info-title">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 개선된 페이지네이션 UI */}
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
  );
};

export default PostBoard;
