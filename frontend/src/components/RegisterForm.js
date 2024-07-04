import React, { useState } from "react";
import "./RegisterForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VerificationBox from "./VerificationBox";
import Alert from "@mui/material/Alert";

export default function RegisterForm({ title, buttonText }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerificationBox, setShowVerificationBox] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupMessage, setSignupMessage] = useState(false);
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const dataToSend = {
      nickname: nickname.trim(),
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", dataToSend);
      if (response.data.status === "success") {
        console.log("Success to save user data");
        setSignupMessage("Successfully signed up! Redirecting to login page...");
        navigate("/login");
      } else if (response.data.status === "fail") {
        console.log("Failed to save user data");
      }
    } catch (error) {
      console.error(error);
    }

    console.log("Register form submitted");
  }

  function handleVerify(e) {
    e.preventDefault();
    setShowVerificationBox(true);

    //setLoading(true);

    try {
      console.log("Sending OTP request to server...");
      const response = axios.post("http://localhost:3000/api/otp/send-otp", { email });
      console.log("OTP response received:", response.data);

      if (response.data.status === "success") {
        setShowVerificationBox(true);
      } else if (response.data.status === "fail") {
        console.log(response.data.message);
        //setEmailError(response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }

  function handleCancel() {
    setShowVerificationBox(false); // Hide VerificationBox on cancel
  }

  return (
    <div className="register-form">
      {showVerificationBox && (
        <VerificationBox email={email} onCancel={handleCancel} onVerifySuccess={() => setIsEmailVerified(true)} />
      )}
      <h2 className={`form ${showVerificationBox ? "blur" : ""}`}>{title}</h2>
      <form className={`form ${showVerificationBox ? "blur" : ""}`} onSubmit={handleSubmit}>
        {signupMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {signupMessage}
          </Alert>
        )}

        <label htmlFor="fullName">Nickname</label>
        <input type="text" id="fullName" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="email-verify-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isEmailVerified}
            />
            {!isEmailVerified && (
              <button className="verify-button" onClick={handleVerify}>
                Verify
              </button>
            )}
            {isEmailVerified && (
              <button className="verify-button verified" disabled>
                Verified!
              </button>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="submit-button-container">
          <button type="submit" className="submit-button" onClick={handleSubmit}>
            {buttonText}
          </button>
        </div>
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
