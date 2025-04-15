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
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button type="submit">댓글 작성</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default CommentForm;
