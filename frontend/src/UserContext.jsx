// import { createContext } from "react";

// const UserContext = createContext(null);

// export default UserContext;
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { frontendLinks } from "./constants/index.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
        console.log("fetchUserInfo:success");
      } else {
        console.error("Failed to fetch user info:", response.data.message);
        logout();
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.data.message === "Token expired. Please login again.") {
        logout();
      }
    }
  };

  const login = (userData) => {
    console.log("User data on login:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    //navigate(frontendLinks.Landing.path);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate(frontendLinks.Login.path);
    console.log("user:", user);
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const ROLES = {
  ADMIN: "6685793fa01b126de433d9bd",
  MEMBER: "6685793fa01b126de433d9ba",
};
