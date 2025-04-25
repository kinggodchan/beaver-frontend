import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordStep.css';

const Step2VerifyPhone = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    // 실제로는 인증번호 확인 처리
    navigate('/password/reset');
  };

  return (
    <div className="password-reset-container">
      <h2 className="title">비밀번호 찾기</h2>
      <p className="subtitle">휴대전화로 인증</p>
      <input className="input-field" placeholder="이름을 입력해주세요." />
      <input className="input-field" placeholder="전화번호를 입력해주세요." />
      <button className="submit-button">인증번호 받기</button>
      <input className="input-field" placeholder="인증번호 입력" />
      <button className="submit-button" onClick={handleNext}>다음</button>
    </div>
  );
};

export default Step2VerifyPhone;
