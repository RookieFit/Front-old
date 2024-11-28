import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="content-container">
                <div className="home-page-character"></div>
                <div className="text-container">
                    <div className="rookiefit-text">
                        <h1>RookieFit</h1>
                        <p>당신의 운동 파트너</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;