
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { frontendLinks } from "../constants/index.js";

import { UserContext } from '../pages/UserContext.jsx';
import { useState, useEffect, useCallback } from 'react';


export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate(frontendLinks.Login.path);
        console.log('user:', user);
    }, [navigate, user]);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");
        const fetchUserInfo = async (token) => {
            try {
                const response = await axios.get(`${API_URL}/api/user/userinfo`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.status === "success") {
                    const userData = response.data.data.user;
                    setUser(userData);
                    console.log("fetchUserInfo: success");
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

        if (token) {
            fetchUserInfo(token);
        }
    }, [logout]);

    const login = (userData) => {
        console.log("User data on login:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        navigate(frontendLinks.Landing.path);
    };



    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const ROLES = {
    ADMIN: "6685793fa01b126de433d9bd",
    MEMBER: "6685793fa01b126de433d9ba",
};
