import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordStep.css';

function Step3ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 비밀번호 변경 로직
    alert('비밀번호가 성공적으로 변경되었습니다!');
    navigate('/login');
  };

  return (
    <div className="password-reset-container">
      <h2 className="title">새 비밀번호 설정</h2>
      <input
        className="input-field"
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button className="submit-button" onClick={handleSubmit}>비밀번호 변경</button>
    </div>
  );
}

export default Step3ResetPassword;
