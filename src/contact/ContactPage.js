import React from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Link와 useNavigate 추가
import "./ContactPage.css";

const ContactPage = () => {
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 사용

  return (
    <div className="contact-container">
      {/* ✅ 헤더 */}
      <header className="contact-header">
        <h1><Link to="/menu">MENU+</Link></h1>
        <h2 className="kick-off">KICK OFF</h2>
        <nav>
          <Link to="/signup">회원가입</Link>
          <Link to="/login">로그인</Link>
        </nav>
      </header>

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
            <button type="button" onClick={() => navigate("/menu")}>List</button> {/* ✅ 버튼 클릭 시 /menu 이동 */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
