import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordStep.css'; // 공통 스타일

const Step1EnterEmail = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // 실제 이메일 유효성 검증, 백엔드 연동 로직이 필요함
    navigate('/password/verify-phone');

  };

  return (
    <div className="password-reset-container">
      <h2 className="title">KICK OFF</h2>
      <p className="subtitle">비밀번호를 찾고자하는 이메일을 입력해주세요.</p>
      <input
        type="email"
        className="input-field"
        placeholder="이메일을 입력해주세요."
      />
      <button className="submit-button" onClick={handleNext}>
        NEXT
      </button>
    </div>
  );
};

export default Step1EnterEmail;
