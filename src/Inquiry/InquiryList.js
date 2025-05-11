import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Inquirylist.css";

const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/inquiry")
      .then(res => setInquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
<div className="inquiry-container">
  <div className="inquiry-header">
    <h2>문의 게시판</h2>
  </div>

    <div className="inquiry-footer">
    <button className="write-button" onClick={() => navigate("/contact")}>
      작성하기
    </button>
  </div>

  <table className="inquiry-table">
    <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
      </tr>
    </thead>
    <tbody>
      {inquiries.map((inquiry, index) => (
        <tr key={inquiry.inquiry_id}>
          <td>{index + 1}</td>
          <td
            className="inquiry-title"
            onClick={() => navigate(`/inquiry/${inquiry.inquiry_id}`)}
            style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
          >
            {inquiry.reason}
          </td>
          <td>{inquiry.name}</td>
          <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
          <td>0</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
};

export default InquiryList;
