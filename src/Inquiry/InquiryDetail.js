import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "./InquiryDetail.css";

const InquiryDetail = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 문의 상세 내용 불러오기
    axios.get(`http://localhost:3000/inquiry/${id}`)
      .then(res => setInquiry(res.data))
      .catch(err => console.error("문의 상세 조회 실패:", err));

    // 댓글 불러오기 (API가 없으면 주석 처리 가능)
    axios.get(`http://localhost:3000/inquiry/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error("댓글 불러오기 실패:", err));
  }, [id]);

  return (
    <>
      <Header />
      <div className="inquiry-detail-container">
        {inquiry ? (
          <>
            <h2 className="inquiry-title">{inquiry.reason}</h2>
            <div className="inquiry-info">
              <p><strong>이메일:</strong> {inquiry.email}</p>
              <p><strong>전화번호:</strong> {inquiry.phone_number}</p>
              <p><strong>작성자:</strong> {inquiry.name}</p>
              <p><strong>작성일:</strong> {new Date(inquiry.created_at).toLocaleDateString()}</p>
            </div>

            <div className="comments">
              <h3>댓글</h3>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-box">
                    <p><strong>{comment.author}</strong></p>
                    <p>{comment.content}</p>
                    <small>{new Date(comment.createdAt).toLocaleDateString()}</small>

                    {comment.replies && comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-box">
                        <p><strong>{reply.author}</strong></p>
                        <p>{reply.content}</p>
                        <small>{new Date(reply.createdAt).toLocaleDateString()}</small>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>아직 댓글이 없습니다.</p>
              )}
            </div>
          </>
        ) : (
          <p>문의 정보를 불러오는 중입니다...</p>
        )}
      </div>
    </>
  );
};

export default InquiryDetail;
