import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './EditProfilePage.css';

const API_BASE_URL = "http://localhost:3000/api";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    location: "",
  });
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { username, email, location } = res.data.data;
        setForm({ username, email, location });
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      }
    };

    fetchProfile();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/user/update`,
        { ...form },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      console.error("프로필 수정 실패:", err);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-title">회원 수정 페이지</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>이름</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>주소</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="submit">수정하기</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
