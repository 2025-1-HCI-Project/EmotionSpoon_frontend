import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../util/ApiService";
import backgroundImg from "../img/Analyzing_playlist_background.png";
import songThumbnail from "../img/example.png";

const AnalyzingPlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await ApiService.getPlaylistByDiaryId(id);
        if (response.data) {
          setPlaylist(response.data);
        }
      } catch (error) {
        console.error("추천곡 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  return (
      <div style={pageWrapperStyle}>
        <img src={backgroundImg} alt="background" style={backgroundFullStyle} />

        <div style={textBlockStyle}>
          <h1 style={mainTextStyle}>
            Here’s a playlist
            <span style={{ display: "block", textDecoration: "underline" }}>that your day</span>
          </h1>
        </div>

        <div style={cardWrapperStyle}>
          <div style={leftCardStyle}>
            <h2
                style={{
                  fontSize: "60px",
                  marginBottom: "1rem",
                  background: "linear-gradient(0deg, #9B8595 0%, #FFFFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
            >
              {loading || !playlist ? "" : playlist.username}
            </h2>
            <p style={{ lineHeight: 1.6, color: "#A7A5A6" }}>
              {loading || !playlist ? "Loading..." : (
                  <>
                    Hello<br />
                    You felt <b>{playlist.sentiment}</b> today.<br />
                    We chose this music just for you.<br />
                    Take a rest and enjoy your song.
                  </>
              )}
            </p>
          </div>

          <div style={rightCardStyle}>
            <div style={songListHeaderStyle}>
              <span style={{ fontWeight: "bold" }}>Best Songs</span>
              <button style={viewAllButtonStyle}>View all</button>
            </div>

            {loading || !playlist ? (
                <div style={{ color: "white" }}>Loading playlist...</div>
            ) : (
                <div style={songRowStyle}>
                  <img src={songThumbnail} alt="song" style={songImgStyle} />
                  <div style={{ flex: 2 }}>
                    <div style={{ fontSize: "1rem", fontWeight: "500" }}>{playlist.song}</div>
                    <div style={{ fontSize: "0.8rem", color: "#ccc" }}>{playlist.artist}</div>
                  </div>
                  <a href={playlist.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <button style={playButtonStyle}>▶</button>
                  </a>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default AnalyzingPlaylistPage;

const pageWrapperStyle = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#000",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const backgroundFullStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  minHeight: "100%",
  objectFit: "cover",
  filter: "blur(20px)",
  zIndex: 0,
};

const textBlockStyle = {
  zIndex: 1,
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "2.5rem",
};

const mainTextStyle = {
  fontSize: "43px",
  fontWeight: "800",
  textAlign: "center",
  background: "linear-gradient(0deg, #9B8595 0%, #CABEC6 50%, #FFFFFF 88%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const cardWrapperStyle = {
  display: "flex",
  gap: "10rem",
  zIndex: 1,
};

const leftCardStyle = {
  width: "410px",
  height: "377px",
  borderRadius: "0 150px 150px 0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "2rem",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const rightCardStyle = {
  width: "465px",
  height: "400px",
  borderRadius: "30px 30px 30px 30px",
  backgroundColor: "rgba(255,255,255,0.05)",
  padding: "1.5rem",
  backdropFilter: "blur(20px)",
  color: "white",
};

const songListHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
};

const songRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem"
};

const songImgStyle = {
  width: "45px",
  height: "45px",
  borderRadius: "10px",
  objectFit: "cover",
};

const playButtonStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid white",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  fontSize: "0.8rem",
  cursor: "pointer",
};

const viewAllButtonStyle = {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
};
