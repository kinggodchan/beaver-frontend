import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css"; // 스타일 파일 추가
import Header from "../component/Header";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/boards/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    axios
      .get(`http://localhost:3000/boards/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="post-detail">
      <Header />
      <div className="post-container">
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} className="post-image" />
        <p className="post-content">{post.content}</p>

        <div className="comment-section">
          <h3>댓글</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment">
                <p><strong>{comment.author}</strong></p>
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

export default PostDetail;
