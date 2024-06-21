// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from './pages/Register';
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Landing from "./pages/Landing";
import LandingVIP from './pages/LandingVIP'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/landingvip" element={<LandingVIP />} />
        </Routes>
      </div>
    </Router>
  );
} 