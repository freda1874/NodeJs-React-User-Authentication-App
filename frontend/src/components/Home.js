// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <button className="login-button" onClick={() => navigate("/login")}>
        Log In
      </button>
      <button className="login-button" onClick={() => navigate("/register")}>
        Sign up
      </button>
    </div>
  );
};

export default Home;
