import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import backgroundImg from "../img/calendar_background.png";
import 'react-calendar/dist/Calendar.css';

const dayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // API에서 일기 데이터(이벤트) 가져오기 예시
  useEffect(() => {
    fetch('/api/diary/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('이벤트 로드 실패:', err));
  }, []);

  // 날짜 클릭 시
  const onDateChange = (newDate) => setDate(newDate);

  // tileContent: 이벤트 마커
  const tileContent = ({ date: d, view }) => {
    if (view !== 'month') return null;
    return events.some(e => new Date(e.date).toDateString() === d.toDateString()) && (
      <div style={{
        position: 'absolute', bottom: 4, right: 4,
        width: 8, height: 8,
        backgroundColor: '#ff4d6d', borderRadius: '50%'
      }} />
    );
  };

  const selectedEvent = events.find(e => new Date(e.date).toDateString() === date.toDateString());
  const formattedDate = `${date.getFullYear()} / ${String(date.getMonth()+1).padStart(2,'0')} / ${String(date.getDate()).padStart(2,'0')} (${dayNames[date.getDay()]})`;

  // 스타일
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
          <h1 style={{ marginBottom: '1.5rem' }}>{selectedEvent?.title || 'Title'}</h1>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Date</div>
          <div style={{ opacity: 0.7, marginBottom: '1.5rem' }}>{formattedDate}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{selectedEvent?.subtitle || 'Music Title'}</div>
              <div style={{ opacity: 0.7 }}>{selectedEvent?.artist || 'artist'}</div>
            </div>
            <div style={{ opacity: 0.7, marginRight: '1rem' }}>{selectedEvent?.length || '2:56'}</div>
            <button style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '50%', width: '32px', height: '32px', color: 'white', cursor: 'pointer'
            }}>▶</button>
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Diary</div>
          <div style={{ marginBottom: '1rem' }}>{selectedEvent?.diary || ''}</div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }} />
          ))}
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
