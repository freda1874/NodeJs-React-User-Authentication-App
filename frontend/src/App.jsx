import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage"
import Login from "./pages/Login"
import ResetPassword from "./pages/ResetPassword"
import Landing from "./pages/Landing"

import { frontendLinks } from "./constants/index"
import UserContext from "./UserContext";
import axios from "axios";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [days, setDays] = useState(2);
  const [role, setRole] = useState('Admin')

  useEffect(() => {
    const fetchUserInfo = async (token) => {
      try {
        const response = await axios.get("http://localhost:5173/api/user/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === "success") {
          const userData = response.data.data.user;
          setUser(userData);
          setIsLoggedIn(true);
          console.log("fetchUserInfo: success");
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

    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path={frontendLinks.Register.path} element={<RegisterPage />} />
          <Route path={frontendLinks.Login.path} element={<Login />} />
          <Route path={frontendLinks.ResetPassword.path} element={<ResetPassword />} />
          <Route
            path={frontendLinks.Landing.path}
            element={
              <Landing isLoggedIn={isLoggedIn} role={role} days={days} userName={user?.nickname} handleLogout={handleLogout}
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}