import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";
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
    <>
    <Header />
    <div className="post-detail-container">
      <div className="post-wrapper">
        <div className="post-content-box">
          <h1>{post.title}</h1>
          <img src={post.file} alt={post.title} className="post-image" />
          <p className="post-content">{post.content}</p>
        </div>

        <div className="comment-box">
          <h3>댓글</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment">
                <p className="comment-author">{comment.author}</p>
                <p>{comment.text}</p>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="no-comment">댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostDetail;
