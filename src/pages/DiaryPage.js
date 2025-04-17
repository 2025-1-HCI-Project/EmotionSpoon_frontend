import React, { useState } from "react";
import backgroundImg from "../img/diary_background.png"; // 배경 이미지 import

const DiaryPage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    console.log({
      date,
      title,
      diaryContent,
      file,
    });
    alert("일기가 저장되었습니다!");
  };

  return (
    // 전체 배경
    <div style={backgroundStyle}>
      {/* 가운데 카드 */}
      <div style={pageStyle}>
        <h1 style={titleStyle}>Write about your day</h1>

        {/* Date와 Title을 나란히 */}
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
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  textAlign: "center",
};

const horizontalGroupStyle = {
  display: "flex",
  justifyContent: "space-between", // 두 개를 양쪽으로 벌리기
  gap: "4rem",
};

const smallInputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  flex: "1",
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
