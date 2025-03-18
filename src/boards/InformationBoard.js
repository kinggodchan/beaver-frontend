import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InformationBoard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('게시글 불러오기 오류:', error);
      });
  }, []);

  return (
    <div>
      <h1>정보 게시판</h1>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <img src={post.imageUrl} alt={post.title} />
              <h2>{post.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InformationBoard;
