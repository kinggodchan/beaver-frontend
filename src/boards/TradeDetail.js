import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "./PostDetail.css"; // 공통 스타일 사용 (PostDetail.css)

const TradeDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boards/trade-posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("거래 게시글 불러오기 오류:", err));

    axios
      .get(`http://localhost:3000/boards/trade-posts/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("댓글 불러오기 오류:", err));
  }, [id]);

  if (!post) return <p>불러오는 중...</p>;

  return (
    <div className="post-detail">
      <Header />
      <div className="post-container">
        <h1>{post.title}</h1>
        <img src={post.imageUrl} alt={post.title} className="post-image" />

        <div className="post-meta">
          <span
            className="post-status"
            style={{
              backgroundColor: post.status === "판매중" ? "#28a745" : "#6c757d",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {post.status}
          </span>
          <p className="post-price">{Number(post.price).toLocaleString()}원</p>
        </div>

        <p className="post-content">{post.description}</p>

        <button className="trade-button">거래 신청하기</button>

        <div className="comment-section">
          <h3>댓글</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment">
                <p>
                  <strong>{comment.author}</strong>
                </p>
                <p>{comment.text}</p>
                <span>{new Date(comment.date).toLocaleDateString()}</span>
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeDetail;
