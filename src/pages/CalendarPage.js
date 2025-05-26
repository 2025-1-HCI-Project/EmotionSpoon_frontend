import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ReactPlayer from "react-player";
import backgroundImg from "../img/calendar_background.png";
import songThumbnail from "../img/example.png";
import 'react-calendar/dist/Calendar.css';
import ApiService from '../util/ApiService';

const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [playing, setPlaying] = useState(false);

  const formatDate = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    ApiService.getAllCalendarEvents()
        .then(res => {
          const loginMemberId = localStorage.getItem('memberId');
          const filtered = res.data.filter(event => event.m_id == loginMemberId);
          setEvents(filtered);
        })
        .catch(err => console.error('이벤트 로드 실패:', err));
  }, []);

  const selectedEvent = [...events]
      .filter(e => e.date === formatDate(date))
      .reverse()
      .find(e => e.song && e.artist);

  useEffect(() => {
    if (selectedEvent?.diaryId) {
      ApiService.getPlaylistByDiaryId(selectedEvent.diaryId)
          .then(res => setPlaylist(res.data))
          .catch(err => console.error("플레이리스트 불러오기 실패:", err));
    } else {
      setPlaylist([]);
    }
  }, [selectedEvent]);

  const handlePlayClick = (url) => {
    if (url == null) {
      setCurrentUrl(null);
      setPlaying(false);
      return;
    }
    if (currentUrl === url) {
      setPlaying(p => !p);
    } else {
      setCurrentUrl(url);
      setPlaying(true);
    }
  };

  const onDateChange = (newDate) => setDate(newDate);

  const formattedDate = `${date.getFullYear()} / ${String(date.getMonth()+1).padStart(2,'0')} / ${String(date.getDate()).padStart(2,'0')} (${dayNames[date.getDay()]})`;

  const tileContent = ({ date: d, view }) => {
    if (view !== 'month') return null;
    return events.some(e => e.date === formatDate(d)) && (
        <div style={{
          position: 'absolute', bottom: 4, right: 4,
          width: 8, height: 8,
          backgroundColor: '#ff4d6d', borderRadius: '50%'
        }} />
    );
  };

  const backgroundStyle = {
    width: '100%', minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover',
    backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem'
  };
  const containerStyle = { display: 'flex', gap: '4rem', maxWidth: '1400px', width: '100%' };
  const leftStyle = {
    flex: '0 0 380px', background: 'rgba(255,255,255,0.1)', borderRadius: '1rem',
    padding: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', position: 'relative'
  };
  const rightStyle = {
    flex: '1', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem',
    padding: '4rem', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', color: 'white',
    maxHeight: "465px", overflow: "scroll"
  };

  return (
      <div style={backgroundStyle}>
        <div style={containerStyle}>
          <div style={leftStyle}>
            <Calendar
                onChange={onDateChange}
                value={date}
                locale="en-US"
                calendarType="iso8601"
                nextLabel="❯"
                prevLabel="❮"
                tileContent={tileContent}
                className="custom-calendar"
                tileClassName={({ date: d, view }) => (
                    view === 'month' && d.toDateString() === new Date().toDateString() ? 'today-highlight' : null
                )}
            />
          </div>
          <div style={rightStyle}>
            <h1 style={{ marginBottom: '1.5rem' }}>{selectedEvent?.sentiment || 'Sentiment'}</h1>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Date</div>
            <div style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{formattedDate}</div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Music</div>
            {playlist.length > 0 ? (
                playlist.slice(0, 3).map((track, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <img src={songThumbnail} alt={`song-${i}`} style={songImgStyle} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                          {track.artist} - {track.song}
                        </div>
                      </div>
                      <button style={playButtonStyle} onClick={() => handlePlayClick(track.link)}>
                        {currentUrl === track.link && playing ? "▌▌" : "▶"}
                      </button>
                    </div>
                ))
            ) : (
                <div style={{ opacity: 0.7, marginBottom: '1rem' }}>추천된 곡이 없습니다.</div>
            )}

            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Diary</div>
            {selectedEvent?.diaryType === 0 ? (
                <div style={{ marginBottom: '1rem' }}>{selectedEvent?.diary || '작성된 일기 없음'}</div>
            ) : (
                selectedEvent?.fileName && (
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/diary/${selectedEvent.fileName}`}
                        alt="diary"
                        style={{
                          maxWidth: '500px',
                          maxHeight: '250px',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: '1rem',
                          marginBottom: '1rem'
                        }}
                    />
                )
            )}

            {!(selectedEvent?.song && selectedEvent?.artist) && (
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{
                      width: '100%',
                      height: '1px',
                      background: 'rgba(255,255,255,0.3)',
                      marginBottom: '0.75rem'
                    }} />
                ))
            )}

            <ReactPlayer
                url={currentUrl}
                playing={playing}
                controls={false}
                width={0}
                height={0}
                style={{ display: "none" }}
            />
          </div>
        </div>
        <style>{`
        .custom-calendar {
          width: 100%;
          background: transparent;
          border: none;
          color: white;
          font-family: inherit;
        }
        .custom-calendar .react-calendar__navigation button {
          color: white;
          min-width: 50px;
          background: none;
          font-size: 1.25rem;
        }
        .custom-calendar .react-calendar__month-view__weekdays__weekday abbr {
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
        }
        .custom-calendar .react-calendar__tile {
          background: transparent;
          color: white;
          border-radius: 0.5rem;
        }
        .custom-calendar .react-calendar__tile--now {
          background: rgba(255,255,255,0.2);
        }
        .custom-calendar .react-calendar__tile--active {
          background: #ff4d6d;
          color: white;
        }
        .custom-calendar .today-highlight {
          box-shadow: inset 0 0 0 2px #ff4d6d;
        }
      `}</style>
      </div>
  );
};

export default CalendarPage;

const songImgStyle = {
  width: "45px",
  height: "45px",
  borderRadius: "8px",
  objectFit: "cover",
  margin: "8px 12px 8px 5px"
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