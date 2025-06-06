import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostBoard.css";

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

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="info-board">
        <h2 className="mb-4">정보 게시판</h2>
        <div className="post-board-container">
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
                onClick={() => navigate(`/board/information/${post.post_id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={post.file} alt={post.title} className="info-image" />
                <div className="info-info">
                  <p className="info-category">{post.category}</p>
                  <h4 className="info-title">{post.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← 이전
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
            다음 →
          </button>
        </div>
      </div>
    </>
  );
};

export default PostBoard;
