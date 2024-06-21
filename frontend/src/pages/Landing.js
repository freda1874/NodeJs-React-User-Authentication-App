import React from 'react';
import './Landing.css';

export default function Landing({ userName, days }) {
    function handleLogout() {
        alert("Logout successful!");
    }

    return (
        <div className="landing-container">
            <div className="background-container">
                <div className="landing-box">
                    <img src={"images/welcome.png"} alt="Welcome" className="welcome-image" />
                    <h1>Hello! Welcome Back</h1>
                    <h2>{userName}</h2>
                    <p>you have been with us for {days} days</p>
                    <button className="logout-button" onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
        </div>
    );
}
