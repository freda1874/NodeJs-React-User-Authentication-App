import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ForgetPwdEmailModal from "./ForgetPwdEmailModal";

export default function RegisterForm({ title, buttonText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showForgetPwdEmailModal, setShowForgetPwdEmailModal] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      if (response.data.status === "success") {
        // Get JWT from backend and save it in the localStorage
        const token = response.data.token;
        localStorage.setItem("token", token);
        setErrorMessage("");
        setLoginSuccessMessage("You have successfully logged in!");
        //navigate("/landing");
        setRedirectUrl(response.data.redirectUrl);
      } else if (response.data.status === "fail") {
        setErrorMessage(response.data.message);
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
    //  }
  }

  function handleForgotPasswordClick(e) {
    e.preventDefault();
    setShowForgetPwdEmailModal(true);
  }

  const closeForgetPasswordModal = () => {
    setShowForgetPwdEmailModal(false);
  };

  useEffect(() => {
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000); // redirect after 3 seconds
    }
  }, [redirectUrl]);

  return (
    <div className="register-form">
      {showForgetPwdEmailModal && <ForgetPwdEmailModal onClose={closeForgetPasswordModal} />}
      <h2>{title}</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {loginSuccessMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {loginSuccessMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="submit-button-container">
          <button type="submit" className="submit-button">
            {buttonText}
          </button>
        </div>

        <p className="login-link">
          {/* <Link to="/reset">Forget Password</Link> */}
          <span onClick={handleForgotPasswordClick} className="clickable-link">
            Forget Password
          </span>
          <Link to="/">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
