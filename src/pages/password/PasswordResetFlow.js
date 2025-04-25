import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Step1EnterEmail from './Step1EnterEmail';
import Step2VerifyPhone from './Step2VerifyPhone';
import Step3ResetPassword from './Step3ResetPassword';

const PasswordResetFlow = () => {
  return (
    <div className="password-flow-wrapper">
      <Routes>
        <Route index element={<Navigate to="/password/enter-email" replace />} />
        <Route path="enter-email" element={<Step1EnterEmail />} />
        <Route path="verify-phone" element={<Step2VerifyPhone />} />
        <Route path="reset" element={<Step3ResetPassword />} />
      </Routes>
    </div>
  );
};

export default PasswordResetFlow;
