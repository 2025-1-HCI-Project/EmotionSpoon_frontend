import React from 'react';
import backgroundImg from '../img/backgroundImg.png';

const LandingPage = () => {
    const pageStyle = {
        width: '100%',
        height: '150vh',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div style={pageStyle}>
        </div>
    );
};

export default LandingPage;
