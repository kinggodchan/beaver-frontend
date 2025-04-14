import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";
import Header from "../component/Header";
import CommentForm from "../component/comment/CommentForm";
import CommentList from "../component/comment/CommentList";

const PostDetail = ({ boardId }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("accessToken");

  const fetchComments = useCallback(() => {
    axios
      .get(`http://localhost:3000/comments/post/${id}/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error("댓글 불러오기 실패:", err));
  }, [id, boardId, token]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boards/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("게시글 불러오기 실패:", err));

    if (token) {
      axios
        .get("http://localhost:3000/api/auth/current-user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCurrentUser(res.data))
        .catch(() => setCurrentUser(null));
    } else {
      setCurrentUser(null);
    }

    fetchComments();
  }, [id, token, fetchComments]);

  const handleSubmitComment = (content) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("토큰 없음! 로그인 먼저 하세요.");
      return Promise.reject(new Error("로그인 후 댓글을 작성해주세요."));
    }
    return axios
      .post(
        `http://localhost:3000/comments/${boardId}/${id}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("댓글 작성 성공:", response);
        fetchComments(); // 댓글 작성 후 댓글 목록 새로 고침
      })
      .catch((error) => {
        console.error("댓글 작성 실패:", error.response || error);
        const errorMessage = error.response
          ? `댓글 작성 실패: ${error.response.data.message || error.response.statusText}`
          : "댓글 작성 실패. 다시 시도해 주세요.";
        throw new Error(errorMessage); // 에러 메시지 던지기
      });
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      await axios.patch(
        `http://localhost:3000/comments/${commentId}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="post-detail-container">
      <Header />
      <div className="post-wrapper">
        <div className="post-content-box">
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} className="post-image" />
          <p className="post-content">{post.content}</p>
        </div>

        <div className="comment-box">
          <h3>댓글</h3>
          <CommentForm onSubmit={handleSubmitComment} />
          <CommentList
            comments={comments}
            currentUser={currentUser}
            boardId={boardId}
            postId={parseInt(id)}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
