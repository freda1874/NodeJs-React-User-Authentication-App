import React, { useState, useEffect } from "react";
import "./RegisterForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function PassowrdForm({ token, title, buttonText }) {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (password !== rePassword) {
  //     setErrorMessage("Passwords do not match!");
  //     return;
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3000/api/auth/resetPassword/${token}`, {
        password,
        rePassword,
      });
      if (response.data.status === "success") {
        setErrorMessage("");
        setSuccessMessage(response.data.message);
        setRedirectUrl(response.data.redirectUrl);
      } else if (response.data.status === "fail") {
        setSuccessMessage("");
        setErrorMessage("Failed to reset password.");
      }
      console.log("Password reset successful:", response.data);
    } catch (err) {
      setErrorMessage("Failed to reset password.");
      console.error("Password reset error:", err);
    }
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRePasswordChange(e) {
    setRePassword(e.target.value);
  }

  useEffect(() => {
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
    }
  }, [redirectUrl]);

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="re-password">Re-enter Password</label>
          <input type="password" id="re-password" value={rePassword} onChange={handleRePasswordChange} required />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {rePasswordError && <p className="error-message">{rePasswordError}</p>}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            {buttonText}
          </button>
        </div>
        <p className="login-link">
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
