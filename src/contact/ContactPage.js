import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ContactPage.css";

const ContactPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    reason: "", // 메시지
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/inquiry", formData);
      alert("✅ 문의가 성공적으로 제출되었습니다!");
      setFormData({ name: "", email: "", phone_number: "", reason: "" }); // 폼 초기화
    } catch (err) {
      console.error("문의 등록 실패:", err);
      alert("❌ 문의 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-content">
          <img src="/question.png" alt="Question" className="question-image" />

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>전화번호</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label>문의 내용</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="문의 내용을 입력하세요"
                required
              ></textarea>
            </div>

            <div className="button-group">
              <button type="submit">제출</button>
              <button type="button" onClick={() => navigate("/inquiry")}>목록</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
