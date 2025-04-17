import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Link와 useLocation 추가
import backgroundImg from '../img/backgroundImg.png';

const LandingPage = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const pageStyle = {
        width: '100%',
        height: '150vh',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '10%',
        color: 'white',
    };

    const titleStyle = {
        fontSize: '4rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        lineHeight: '1.2',
    };

    const descriptionStyle = {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        maxWidth: '500px',
    };

    const buttonStyle = {
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        backgroundColor: '#ff4ec7',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        textDecoration: 'none', 
        display: 'inline-block',
    };

    return (
        <div style={pageStyle}>
            <div style={titleStyle}>
                Feel the Day <br /> Through Music
            </div>
            <div style={descriptionStyle}>
            “At the end of your day, write a diary we’ll deeply analyze your emotions and recommend music and playlists that match your mood.”
            </div>
            <Link
                to="/diary"
                className={currentPath === '/diary' ? 'active' : ''}
                style={buttonStyle}
            >
                Write your day
            </Link>
        </div>
    );
};

export default LandingPage;
