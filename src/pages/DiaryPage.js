import React, { useState } from "react";
import backgroundImg from "../img/diary_background.png";
import { useNavigate } from 'react-router-dom';
import ApiService from "../util/ApiService";

const DiaryPage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const storedMemberId = localStorage.getItem("memberId");
      if (!storedMemberId) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const diaryDTO = {
        memberId: parseInt(storedMemberId),
        date: date,
        title: title,
        diaryContent: diaryContent,
      };

      const response = await ApiService.diaryUpload(file, diaryDTO);
      console.log("업로드 성공:", response.data);

      alert("일기가 저장되었습니다!");
      navigate("/analyzing");
    } catch (error) {
      console.error("업로드 실패!");
      if (error.response) {
        console.error("에러 응답 데이터:", error.response.data);
      } else {
        console.error("네트워크 또는 클라이언트 에러:", error.message);
      }
      alert("업로드 실패. 콘솔을 확인해주세요.");
    }
  };

  return (
      <div style={backgroundStyle}>
        <div style={pageStyle}>
          <h1 style={titleStyle}>Write about your day</h1>

          <div style={horizontalGroupStyle}>
            <div style={smallInputGroupStyle}>
              <label style={labelStyle}>Date</label>
              <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={smallInputStyle}
              />
            </div>

            <div style={smallInputGroupStyle}>
              <label style={labelStyle}>Title</label>
              <input
                  type="text"
                  placeholder="Type your title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={smallInputStyle}
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Diary</label>
            <small style={smallTextStyle}>
              Please describe your day and write it down to help you remember it.
            </small>
            <textarea
                placeholder="Type your diary here..."
                value={diaryContent}
                onChange={(e) => setDiaryContent(e.target.value)}
                style={textareaStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload diary file</label>
            <small style={smallTextStyle}>
              Take a picture of your diary and upload here
            </small>
            <input
                type="file"
                onChange={handleFileChange}
                style={fileInputStyle}
            />
          </div>

          <button style={saveButtonStyle} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
  );
};

const backgroundStyle = {
  width: "100%",
  minHeight: "100vh",
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const pageStyle = {
  width: "1152px",
  padding: "4rem",
  background: "linear-gradient(180deg, #0F0E20 0%, #3F3B86 51%, #3F3B86 100%)",
  marginTop: "7rem",
  marginBottom: "3rem",
  overflowX: 'hidden',
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const titleStyle = {
  fontSize: "38px",
  fontWeight: "bold",
  textAlign: "center",
  marginTop: "0"
};

const horizontalGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "4rem",
  width: "97%",
};

const smallInputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
  width: "50%",
};

const smallInputStyle = {
  width: "100%",
  padding: "1rem",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  backgroundColor: 'rgba(176, 186, 195, 0.32)',
  color: "#333",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const textareaStyle = {
  padding: "1rem",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  backgroundColor: 'rgba(176, 186, 195, 0.32)',
  color: "#8A8A8A",
  minHeight: "200px",
};

const fileInputStyle = {
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: 'rgba(176, 186, 195, 0.32)',
  color: "#333",
  cursor: "pointer",
};

const saveButtonStyle = {
  marginTop: "2rem",
  padding: "1rem",
  backgroundColor: "#FA2870",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
};

const smallTextStyle = {
  fontSize: "0.9rem",
  color: "#7C838A",
};

export default DiaryPage;
