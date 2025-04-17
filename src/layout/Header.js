import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const headerStyle = `
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    z-index: 1000;
    background-color: transparent;
    display: flex;
    justify-content: center;
  }

  .header-inner {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
    color: white;
    white-space: nowrap;
  }

  .search-box {
    flex: 1 1 200px;
    max-width: 300px;
    background-color: rgba(255,255,255,0.2);
    border-radius: 30px;
    padding: 8px 16px;
    color: white;
    border: none;
    outline: none;
  }

  .menu {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .menu a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }

  .menu a.active {
    color: #ff4d6d;
  }

  .register-btn {
    background-color: #ff4d6d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 30px;
    font-weight: bold;
    text-decoration: none;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .header-inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .search-box {
      width: 100%;
    }

    .menu {
      width: 100%;
      justify-content: flex-start;
    }
  }
`;

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            <div className="header">
                <div className="header-inner">
                    <Link to="/" className="logo">EMOTION SPOON 🎧</Link>

                    <input className="search-box" type="text" placeholder="Search" />

                    <div className="menu">
                        <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/diary" className={currentPath === '/diary' ? 'active' : ''}>Diary</Link>
                        <Link to="/playlist" className={currentPath === '/playlist' ? 'active' : ''}>Playlist</Link>
                        <Link to="/explore" className={currentPath === '/explore' ? 'active' : ''}>Explore</Link>
                        <Link to="/login" className={currentPath === '/login' ? 'active' : ''}>Log In</Link>
                        <Link to="/register" className={`register-btn ${currentPath === '/register' ? 'active' : ''}`}>Register</Link>
                    </div>
                </div>
            </div>

            <style>{headerStyle}</style>
        </>
    );
};

export default Header;
