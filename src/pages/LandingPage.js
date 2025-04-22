import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import backgroundImg from "../img/backgroundImg.png";
import Footer from "../layout/Footer";
import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";

const LandingPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const fadeInUp = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = fadeInUp;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: "10%",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginTop: "18rem",
            marginBottom: "1rem",
            lineHeight: "1.2",
          }}
        >
          Feel the Day <br /> Through Music
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            maxWidth: "500px",
          }}
        >
          At the end of your day, write a diary.
          <br />
          We'll deeply analyze your emotions
          <br />
          and recommend music and playlists that match your mood.
        </div>
        <Link
          to="/diary"
          className={currentPath === "/diary" ? "active" : ""}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#ff4ec7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Write your day
        </Link>
      </div>

      <div
        style={{
          background:
            "linear-gradient(180deg, #000000 5%, #000000 14%, #010000 29%, #A41045 60%, #000000 91%)",
          padding: "5rem 10%",
          color: "white",
          textAlign: "center",
          animation: "fadeInUp 1.5s ease-out",
          animationFillMode: "both",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          The Hottest Tracks Of <br /> The Week: New Day
        </h2>
        <p style={{ marginBottom: "3rem", color: "#ccc" }}>
          "No need to explain — this track understands. Just press play."
        </p>

        <div style={trackListStyle}>
          <div style={trackCardStyle}>
            <img src={img1} alt="All Day" style={trackImgStyle} />
            <h1 style={{ margin: "0 0 -0.2rem 0" }}>All DAY</h1>{" "}
            <p style={{ color: "#ccc", margin: "0 0 1.5rem 0" }}>George</p>{" "}
            <p style={{ margin: "0 0 0.8rem 0" }}>🎧 136k listens</p>
          </div>

          <div style={trackCardStyle}>
            <img src={img2} alt="New Day" style={trackImgStyle} />
            <h1 style={{ margin: "0 0 -0.2rem 0" }}>Crush</h1>{" "}
            <p style={{ color: "#ccc", margin: "0 0 1.5rem 0" }}>George</p>{" "}
            <p style={{ margin: "0 0 0.8rem 0" }}>🎧 124k listens</p>
          </div>

          <div style={trackCardStyle}>
            <img src={img3} alt="New Day" style={trackImgStyle} />
            <h1 style={{ margin: "0 0 -0.2rem 0" }}>Dream</h1>{" "}
            <p style={{ color: "#ccc", margin: "0 0 1.5rem 0" }}>Keshi</p>{" "}
            <p style={{ margin: "0 0 0.8rem 0" }}>🎧 122k listens</p>
          </div>
        </div>
        {/*<Footer />*/}
      </div>
    </div>
  );
};

// 스타일 부분
const trackListStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "3rem",
  flexWrap: "wrap",
};

const trackCardStyle = {
  background: "rgba(217, 217, 217, 0.05)",
  border: "1px solid rgba(217, 217, 217, 0.16)",
  padding: "2rem",
  borderRadius: "1rem",
  width: "220px",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s",
  textAlign: "left",
};

const trackImgStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "0.5rem",
  marginBottom: "1rem",
};

export default LandingPage;
