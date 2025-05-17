import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TradePostCreate.css";

const TradePostCreate = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    alert("사진 첨부는 필수입니다.");
    return;
  }

  const formData = new FormData();
  formData.append("boardId", 2); // 게시판 ID, 숫자도 문자열로 자동 변환됨
  formData.append("authorId", 1); // 실제 로그인한 사용자 ID로 교체하세요
  formData.append("title", title);
  formData.append("content", description);
  formData.append("price", price);
  formData.append("tradeStatus", "Available");
  formData.append("file", file); // 이미지 파일

  try {
    await axios.post(
      "http://localhost:3000/boards/trade-posts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type은 지정하지 마세요! axios가 자동 설정
        },
      }
    );

    alert("등록되었습니다.");
    navigate("/boards/trade-posts");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert("등록에 실패했습니다: " + (err.response?.data?.message || err.message));
      console.error(err.response?.data || err.message);
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
      console.error(err);
    }
  }
};


  return (
    <div className="trade-post-create-container">
      <h2>장터 게시글 작성</h2>
      <form onSubmit={handleSubmit} className="trade-form">
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          가격 (원):
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          상세 설명:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          사진 첨부:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default TradePostCreate;
