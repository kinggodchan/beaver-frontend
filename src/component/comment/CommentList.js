import React from "react";

const CommentList = ({ comments, currentUser, onUpdate, onDelete }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
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
                <button
                  onClick={() => {
                    if (window.confirm("정말로 삭제하시겠습니까?")) {
                      onDelete(comment.comment_id);
                    }
                  }}
                >
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
