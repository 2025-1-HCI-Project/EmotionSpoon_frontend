// 감정 분석 페이지
import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ApiService from '../util/ApiService';
import backgroundImg from "../img/analyzing_background.png";
import diaryPhoto from "../img/example.png";

const AnalyzingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analyzing] = useState(true);

    useEffect(() => {
        const analyze = async () => {
            try {
                await ApiService.analyzeDiary(id);
                navigate(`/analyzing/${id}/playlist`);
            } catch (error) {
                console.error("분석 실패!", error);
            }
        };

        analyze();
    }, [id, navigate]);


    return (
        <div style={pageWrapperStyle}>
            <img src={backgroundImg} alt="background" style={backgroundFullStyle} />
            <div style={cardStyle}>
                <div style={textSectionStyle}>
                    <h1 style={mainTextStyle}>Analyzing your day...</h1>
                    <p style={subTextStyle}>
                        {analyzing
                            ? "analyzing your day and thinking\nabout the music that ends your day."
                            : "Analysis complete! 🎵"}
                    </p>
                </div>
                <div style={imageSectionStyle}>
                    <img src={diaryPhoto} alt="diary" style={photoStyle} />
                </div>
            </div>
        </div>
    );
};


export default AnalyzingPage;

// 스타일 설정
const pageWrapperStyle = {
    width: "100%",
    height: "100vh",
    backgroundColor: "#0F0E20", 
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const backgroundFullStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
};

const cardStyle = {
    width: "837px",
    height: "375px",
    background: "linear-gradient(90deg, #40E0D0 0%, #FF0080 100%)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem 3rem",
    zIndex: 1, 
};

const textSectionStyle = {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
};

const mainTextStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
};

const subTextStyle = {
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: "1.5",
};

const imageSectionStyle = {
    flexShrink: 0,
};

const photoStyle = {
    width: "300px",
    height: "300px",
    borderRadius: "10px",
    objectFit: "cover",
};