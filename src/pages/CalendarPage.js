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

  // 현재 재생 중인 URL과 재생 상태를 관리
  const [currentUrl, setCurrentUrl] = useState(null);
  const [playing, setPlaying] = useState(false);

  const formatDate = (d) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    ApiService.getAllCalendarEvents()
        .then(res => {
          setEvents(res.data);
        })
        .catch(err => console.error('이벤트 로드 실패:', err));
  }, []);

  const handlePlayClick = (url) => {
    if (url == null) {
      // null인 노래를 누르면 정지
      setCurrentUrl(null);
      setPlaying(false);
      return;
    }

    if (currentUrl === url) {
      // 같은 곡을 다시 누르면 토글
      setPlaying((p) => !p);
    } else {
      // 다른 곡을 누르면 새로 재생
      setCurrentUrl(url);
      setPlaying(true);
    }
  };

  const onDateChange = (newDate) => setDate(newDate);

  const selectedEvent = [...events]
      .filter(e => e.date === formatDate(date))
      .reverse() // 가장 최근에 작성한 일기 기준(find는 첫 번째 인덱스를 조회)
      .find(e => e.song && e.artist);

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
    padding: '4rem', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', color: 'white'
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
            <h1 style={{ marginBottom: '1.5rem' }}>{selectedEvent?.song || 'Music Title'}</h1>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Date</div>
            <div style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{formattedDate}</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                    src={songThumbnail}
                    alt="song"
                    style={songImgStyle}
                  />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{selectedEvent?.artist || 'artist'}</div>
              </div>
              <button
                style={playButtonStyle}
                onClick={() => handlePlayClick(selectedEvent?.link)}
              >
                {currentUrl === selectedEvent?.link && playing ? "▌▌": "▶"}
              </button>
            </div>
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
                Array.from({length: 6}).map((_, i) => (
                    <div key={i} style={{
                      width: '100%',
                      height: '1px',
                      background: 'rgba(255,255,255,0.3)',
                      marginBottom: '0.75rem'
                    }}/>
                ))
            )}

          {/* 숨겨진 플레이어: 화면에 보이지 않지만 음원은 재생 */}
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