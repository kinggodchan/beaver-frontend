import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css"; // ✅ 스타일 파일 추가

const PostDetail = () => {
  const { postId } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 게시글 데이터 가져오기
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => console.error("Error fetching post:", error));

    // 댓글 데이터 가져오기
    axios.get(`http://localhost:3000/comments?postId=${postId}`)
      .then(response => setComments(response.data))
      .catch(error => console.error("Error fetching comments:", error));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} className="post-image" />
      <p className="post-content">{post.content}</p>

      {/* 댓글 섹션 */}
      <div className="comments-section">
        <h3>댓글</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.author}</strong>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
