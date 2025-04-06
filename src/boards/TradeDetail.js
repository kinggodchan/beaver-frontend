import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "./TradeDetail.css";

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
    <div className="trade-detail-container">
      <Header />
      <div className="trade-detail-wrapper">
        <img src={post.imageUrl} alt={post.title} className="trade-img" />
        <div className="trade-info">
          <div className="trade-header">
            <h2>{post.title}</h2>
            <span className="trade-status">{post.status}</span>
          </div>
          <p className="trade-price">
            {Number(post.price).toLocaleString()}원
          </p>
          <p className="trade-description">{post.description}</p>
          <button className="trade-button">거래 신청하기</button>
        </div>
      </div>

      <div className="comment-box">
        <h3>댓글</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-date">
                {new Date(comment.date).toLocaleDateString()}
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comment">댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TradeDetail;
