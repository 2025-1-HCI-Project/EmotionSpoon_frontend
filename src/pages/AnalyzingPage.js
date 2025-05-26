// 감정 분석 페이지
import React, { useEffect, useState, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ApiService from '../util/ApiService';
import backgroundImg from "../img/analyzing_background.png";
import diaryPhoto from "../img/example.png";

const AnalyzingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [analyzing, setAnalyzing] = useState(true);
    const intervalRef = useRef(null);
    const progressRef = useRef(0);

    useEffect(() => {
        // 1분에 걸쳐 100%에 도달하는 인터벌 시작
        intervalRef.current = setInterval(() => {
            setProgress(prev => {
                const next = Math.min(prev + (100 / 90), 100);
                progressRef.current = next;
                return next;
            });
        }, 1000);
        
        const analyze = async () => {
            try {
                await ApiService.analyzeDiary(id);

                // 응답이 오면 빠르게 progress를 100%로 설정
                clearInterval(intervalRef.current);
                const current = progressRef.current;
                // 0.1초 간격으로 빠르게 증가
                const step = (100 - current) / 10;

                let i = 0;
                const fastInterval = setInterval(() => {
                    i++;
                    setProgress(prev => {
                        const updated = prev + step;
                        if (updated >= 100 || i >= 10) {
                            clearInterval(fastInterval);
                            setProgress(100);
                            setAnalyzing(false);
                            setTimeout(() => {
                                navigate(`/analyzing/${id}/playlist`);
                            }, 500);
                        }
                        return updated;
                    });
                }, 50); // 빠르게 증가
            } catch (error) {
                console.error("분석 실패!", error);
                clearInterval(intervalRef.current);
            }
        };

        analyze();

        return () => clearInterval(intervalRef.current);
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
                <div style={progressBarContainerStyle}>
                    <div style={{ ...progressBarStyle, width: `${progress}%` }} />
                    <div style={progressIndicatorStyle(progress)}>🎵</div> 
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
    position: "relative",
    overflow: "hidden",
};

const textSectionStyle = {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    position: "relative",
    height: "100%",
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

const progressBarContainerStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
};

const progressBarStyle = {
    height: "100%",
    backgroundColor: "#FFFFFF",
    transition: "width 0.1s ease-in-out",
    position: "relative",
};

const progressIndicatorStyle = (progress) => ({
    position: "absolute",
    bottom: "100%", // progress bar 위쪽에 위치
    left: `calc(${progress}% - 10px)`, // 진행도 위치에 따라 이동 (아이콘 중앙 정렬용 -10px)
    transition: "left 0.1s ease-in-out",
    fontSize: "1rem",
});
