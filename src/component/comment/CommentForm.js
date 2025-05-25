import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      setError("댓글을 입력해주세요.");
      return;
    }

    onSubmit(content)
      .then(() => {
        setContent("");
        setError("");
      })
      .catch((err) => {
        console.error("댓글 작성 실패", err);
        setError(err.message || "댓글 작성 실패. 다시 시도해 주세요.");
      });
  };

  return (
    <div>
      <form className="commentForm" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            style={{ flex: 1, height: '60px', resize: 'none' }}
          />
          <button className="commentSubmit" type="submit">
            댓글 작성
          </button>
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CommentForm;
