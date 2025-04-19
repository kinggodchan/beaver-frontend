import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "../component/comment/CommentForm";
import CommentList from "../component/comment/CommentList";
import "./TradeDetail.css";

const TradeDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("accessToken");
  const boardId = 2; // 거래게시판 고정 boardId

  // 댓글 불러오기
  const fetchComments = useCallback(() => {
    axios
      .get(`http://localhost:3000/comments/post/${id}/${boardId}`)
      .then((res) => {
        console.log("댓글 데이터:", res.data);
        setComments(res.data);
      })
      .catch((err) => console.error("댓글 불러오기 실패:", err));
  }, [id, boardId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boards/trade-posts/${id}`)
      .then((res) => setPost(res.data));

    axios
      .get("http://localhost:3000/api/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null));
  }, [id, token]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleUpdateComment = async (commentId, content) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/comments/${commentId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("댓글 수정 결과:", res.data);
      fetchComments();
    } catch (err) {
      console.error("댓글 수정 실패:", err.response || err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("댓글 삭제 결과:", res.data);
      fetchComments();
    } catch (err) {
      console.error("댓글 삭제 실패:", err.response || err);
    }
  };

  if (!post) return <p>불러오는 중...</p>;

  return (
    <>
      <div className="trade-detail-container">
        <div className="trade-detail-wrapper">
          <img src={post.file} alt={post.title} className="trade-img" />
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
        {currentUser ? (
          <CommentForm
            onSubmit={(content) => {
              return axios
                .post(
                  `http://localhost:3000/comments/2/${id}`,
                  { content },
                  { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(() => fetchComments());
            }}
          />
        ) : (
          <p style={{ color: "gray" }}>로그인 후 댓글을 작성할 수 있습니다.</p>
        )}

        <CommentList
          comments={comments}
          postId={parseInt(id)}
          currentUser={currentUser}
          boardId={boardId}
          onUpdate={handleUpdateComment}
          onDelete={handleDeleteComment}
        />
      </div>
      </div>
    </>
  );
};

export default TradeDetail;
