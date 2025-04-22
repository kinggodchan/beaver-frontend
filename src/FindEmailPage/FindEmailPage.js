import React, { useState } from 'react';
import axios from 'axios';
import './FindEmailPage.css';

function FindEmailPage() {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    // 여기서는 실제 문자 인증 구현 대신 콘솔 출력
    console.log(`인증번호 전송: ${phoneNumber}`);
    alert('인증번호를 발송했습니다.');
  };

  const handleFindEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/find-email', {
        username,
        phone_number: phoneNumber,
      });

      if (response.data.success) {
        setEmail(response.data.data.email);
        setError('');
      } else {
        setEmail('');
        setError('이메일을 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      setEmail('');
      setError('오류가 발생했습니다.');
    }
  };

  return (
    <div className="find-email-wrapper">
      <div className="tabs">
        <div className="tab active">이메일 찾기</div>
        <div className="tab">비밀번호 찾기</div>
      </div>

      <div className="find-box">
        <h2>휴대전화번호 인증</h2>
        <form onSubmit={handleFindEmail} className="find-email-form">
          <input
            type="text"
            placeholder="이름을 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="phone-row">
            <input
              type="text"
              placeholder="휴대전화번호 입력"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="button" onClick={handleSendCode}>인증번호 받기</button>
          </div>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit" className="next-btn">다음</button>
        </form>
        {email && (
          <div className="result">
            <p>찾으신 이메일: <strong>{email}</strong></p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default FindEmailPage;
