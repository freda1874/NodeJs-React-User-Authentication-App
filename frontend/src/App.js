import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import LandingVIP from "./pages/LandingVIP";
import UserContext from "./UserContext";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [days, setDays] = useState(364);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/userinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === "success") {
        const userData = response.data.data.user;
        setUser(userData);
        setIsLoggedIn(true);
        console.log("fetchUserInfo:success");
      } else {
        console.error("Failed to fetch user info:", response.data.message);
        handleLogout();
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.data.message === "Token expired. Please login again.") {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/landing"
              element={
                <Landing isLoggedIn={isLoggedIn} days={days} userName={user?.nickname} handleLogout={handleLogout} />
              }
            />
            <Route path="/landingvip" element={<LandingVIP />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
