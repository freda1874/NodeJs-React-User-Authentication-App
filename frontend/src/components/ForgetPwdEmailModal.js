import React, { useState } from "react";
import "./ForgetPwdEmailModal.css";
import Alert from "@mui/material/Alert";
import axios from "axios";

export default function ForgetPwdEmailModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function sendLink(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/forgetPassword", { email });
      if (response.data.status === "success") {
        setErrorMessage("");
        setSuccessMessage(
          "Password reset link send to the user email. Please check your email to reset your password."
        );
      } else {
        setSuccessMessage("");
        setErrorMessage("Failed to send password reset email.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error sending reset email:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <div className="email-modal">
      <h2>Reset Password</h2>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="text" id="Email" name="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <div className="button-group">
        <button onClick={sendLink} className="send-button">
          Send Link
        </button>
      </div>
      <div onClick={onClose} className="cancel-group">
        <span className="cancel-icon">☚</span>
        <span className="cancel-text">Cancel</span>
      </div>
    </div>
  );
}
