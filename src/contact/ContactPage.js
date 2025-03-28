import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Link와 useNavigate 추가
import "./ContactPage.css";
import Header from "../component/Header";

const ContactPage = () => {
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 사용

  return (
    <>
      <Header /> {/* ✅ 헤더 컴포넌트 추가 */}
      <div className="contact-container">
        <div className="contact-content">
          {/* ✅ 이미지 (public 폴더 접근) */}
          <img src="/question.png" alt="Question" className="question-image" />

          {/* ✅ 폼 영역 */}
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Enter your message"></textarea>
            </div>

            {/* ✅ 버튼 그룹 */}
            <div className="button-group">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => navigate("/menu")}>
                List
              </button>{" "}
              {/* ✅ 버튼 클릭 시 /menu 이동 */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
