import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import backgroundImg from "../img/backgroundImg.png";
import Footer from "../layout/Footer";
import img1 from "../img/1.png";
import img2 from "../img/2.png";
import img3 from "../img/3.png";

const LandingPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // 등장 애니메이션 상태 & ref
  const [isTracksVisible, setIsTracksVisible] = useState(false);
  const tracksRef = useRef(null);

  useEffect(() => {
    // keyframes + 클래스 정의
    const styles = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up {
        opacity: 0;
        transform: translateY(50px);
      }
      .fade-in-up.visible {
        opacity: 1;
        animation: fadeInUp 1s ease-out forwards;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTracksVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (tracksRef.current) observer.observe(tracksRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div
        style={{
          width: "100",
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
            marginTop: "20rem",
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
            lineHeight: 1.5,
          }}
        >
          At the end of your day, write a diary.
          <br />
          We'll deeply analyze your emotions
          <br />
          and recommend music and playlists that match your mood.
        </div>
        <Link
          to="/login"
          className={currentPath === "/diary" ? "active" : ""}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#EE10B0",
            color: "white",
            border: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Log in
        </Link>
      </div>

      <div
        ref={tracksRef}
        className={`fade-in-up ${isTracksVisible ? "visible" : ""}`}
        style={{
          background:
            "linear-gradient(180deg, #000000 5%, #000000 14%, #010000 29%,  rgba(164,16,69,0.4) 50%, #000000 91%)",
          padding: "5rem 10%",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "3rem", marginBottom: "1rem" , marginTop: "10rem"}}>
          The Hottest Tracks Of <br /> The Week: New Day
        </h2>
        <p style={{ marginBottom: "3rem", color: "#ccc", lineHeight: 1.4 }}>
          "No need to explain — this track understands. Just press play."
        </p>

        <div style={trackListStyle}>
          {[ [img1,"All DAY","George","136k"],
             [img2,"Crush","George","124k"],
             [img3,"Dream","Keshi","122k"],
          ].map(([img,title,artist,listens], i) => (
            <div key={i} style={trackCardStyle}>
              <img src={img} alt={title} style={trackImgStyle} />
              <h1 style={{ margin: "0 0 -0.2rem 0" }}>{title}</h1>
              <p style={{ color: "#ccc", margin: "0 0 1.5rem 0" }}>
                {artist}
              </p>
              <p style={{ margin: "0 0 0.8rem 0" }}>
                🎧 {listens} listens
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

// 하단 스타일들
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
  width: "300px",
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
