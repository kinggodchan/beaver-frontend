import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import "./InquiryDetail.css";

const InquiryDetail = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);

  useEffect(() => {
    // 문의 상세 내용 불러오기
    axios.get(`http://localhost:3000/inquiry/${id}`)
      .then(res => setInquiry(res.data))
      .catch(err => console.error("문의 상세 조회 실패:", err));
  }, [id]);

  return (
    <>
      <Header />
      <div className="inquiry-detail-container">
        {inquiry ? (
          <>
            <h2 className="inquiry-title">{inquiry.reason}</h2>
            <div className="inquiry-info">
              <p><strong>작성자:</strong> {inquiry.name}</p>
              <p><strong>작성일:</strong> {new Date(inquiry.created_at).toLocaleDateString()}</p>
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
