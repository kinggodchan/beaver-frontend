import React from "react";

const CommentItem = ({ comment, currentUser, onUpdate, onDelete }) => {
  return (
    <li>
      <p>{comment.content}</p>

      {/* 작성자 정보 */}
      <p style={{ fontSize: "12px", color: "gray" }}>
        {comment.author.username} |{" "}
        {new Date(comment.createdAt).toLocaleString()}
      </p>

      {/* 로그인 사용자 = 작성자면 수정/삭제 버튼 */}
      {currentUser && currentUser.id === comment.author.id && (
        <div>
          <button
            onClick={() =>
              onUpdate(
                comment.comment_id,
                prompt("수정할 내용:", comment.content)
              )
            }
          >
            수정
          </button>
          <button onClick={() => onDelete(comment.comment_id)}>삭제</button>
        </div>
      )}
    </li>
  );
};

export default CommentItem;
