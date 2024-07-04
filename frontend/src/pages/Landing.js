import React from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";

export default function Landing({ isLoggedIn, userName, days, handleLogout }) {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="landing-container">
      <div className="background-container">
        <div className="landing-box">
          <img src={"images/welcome.png"} alt="Welcome" className="welcome-image" />
          {isLoggedIn ? (
            <>
              <h1>Hello! Welcome Back</h1>
              <h2>{userName}</h2>
              <p>You have been with us for {days} days</p>
              <button className="logout-button" onClick={logoutAndRedirect}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <h2>This page is only for users. Please login to access this page</h2>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
