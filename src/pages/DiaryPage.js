import React, { useState } from "react";
import backgroundImg from "../img/diary_background.png";
import { useNavigate } from 'react-router-dom';
import ApiService from "../util/ApiService";

const DiaryPage = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  
  // text extract logic
  const [file, setFile] = useState(null); // uploaded file
  const [showModal, setShowModal] = useState(false); // check text extraction
  const [extractedText, setExtractedText] = useState(""); // extracted text
  const [fileName, setFileName] = useState(""); // uploaded file name
  const [showTextModal, setShowTextModal] = useState(false); // confirm the extracted text is okay
  const [loading, setLoading] = useState(false); // show text extraction is in progress
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setShowModal(true);
    }
  };
  
  const handleModalConfirm = async () => {
    setShowModal(false);
    setLoading(true); // 로딩 시작

    if (!file) return;
  
    try {
      const response = await ApiService.extractTextFromImage(file);
      setExtractedText(response.data.text || "");
      setLoading(false); // 로딩 끝
      setShowTextModal(true);
      document.body.style.overflow = "hidden"; // 모달 뒤가 스크롤되는 문제 해결
    } catch (error) {
      alert("Failed to extract text");
      console.error("텍스트 추출 실패:", error);
    }
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setFileName(""); // 초기화
  };
  
  const handleAddExtractedText = () => {
    setDiaryContent(prev => prev + "\n" + extractedText);
    setShowTextModal(false);
    document.body.style.overflow = "auto"; // 스크롤 복원
  };
  
  const handleSkipExtractedText = () => {
    setShowTextModal(false);
    setFileName(""); // 초기화
    document.body.style.overflow = "auto"; // 스크롤 복원
  
  };  

  const handleSave = async () => {
    try {
      const storedMemberId = localStorage.getItem("memberId");
      if (!storedMemberId) {
        alert("Please log in to continue");
        navigate("/login");
        return;
      } 

      const diaryDTO = {
        memberId: parseInt(storedMemberId),
        date: date,
        title: title,
        diaryContent: diaryContent,
      };

      const saveResponse = await ApiService.diarySave(file, diaryDTO);
      const diaryId = saveResponse.data.diaryId;

      navigate(`/analyzing/${diaryId}`);
    } catch (error) {
      console.error("Failed to save file", error);
    }
  };


  return (
      <div style={backgroundStyle}>
        <div style={pageStyle}>
          <h1 style={titleStyle}>Write about your day</h1>
          <div style={horizontalGroupStyle}>
            <div style={smallInputGroupStyle}>
              <label style={labelStyle}>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={smallInputStyle} />
            </div>
            <div style={smallInputGroupStyle}>
              <label style={labelStyle}>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={smallInputStyle} />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Diary</label>
            <textarea value={diaryContent} onChange={(e) => setDiaryContent(e.target.value)} style={textareaStyle} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Upload diary file</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => document.getElementById("fileInput").click()}
                style={{ ...modalButtonStyle, padding: "0.6rem 1rem", backgroundColor: "#FA2870" }}
              >
                Select file
              </button>
              <span style={smallTextStyle}>{fileName || "No file selected"}</span>
            </div>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <button style={saveButtonStyle} onClick={handleSave}>Save</button>

          {showModal && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <p>Would you like to send this photo to extract text?</p>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1rem" }}>
                <button onClick={handleModalConfirm} style={modalButtonStyle}>Yes</button>
                <button onClick={handleModalCancel} style={modalButtonStyle}>No</button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div style={modalOverlayStyle}>
            <div style={modalStyle}>
              <p>Extracting text...</p>
              <div className="loader" style={{ marginTop: "1rem" }}></div>
            </div>
          </div>
        )}

        {showTextModal && (
          <div style={modalOverlayStyle}>
            <div style={{ ...modalStyle, width: "500px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Would you like to add the extracted text to your diary?
              </p>
              <div style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                textAlign: "left",
                whiteSpace: "pre-wrap"
              }}>
                {extractedText || "Empty)"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button onClick={handleAddExtractedText} style={modalButtonStyle}>Add</button>
                <button onClick={handleSkipExtractedText} style={modalButtonStyle}>Skip</button>
              </div>
            </div>
          </div>
        )}
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
  color: "#FFFFFF",
  fontSize: "15px"
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
  color: "#FFFFFF",
  minHeight: "200px",
  fontSize: "17px"
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
  color: "white",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "12px",
  textAlign: "center",
  width: "300px",
  color: "#000"
};

const modalButtonStyle = {
  padding: "0.5rem 1.2rem",
  backgroundColor: "#3F3B86",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3F3B86;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(loaderStyle);

export default DiaryPage;