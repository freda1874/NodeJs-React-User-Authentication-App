import React, { useState } from "react";
import "./VerificationBox.css";
import axios from "axios";

export default function VerificationBox({ email, onCancel, onVerifySuccess }) {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function verifyCode(e) {
    // if (code === "123") {
    //   navigate("/login");
    // } else {
    //   setErrorMessage("The code is incorrect. Please recheck the code or resend a new code.");
    // }
    e.preventDefault();
    console.log("OTP submitted:", otp);

    try {
      const response = await axios.post("http://localhost:3000/api/otp/verify-otp", { email, otp });

      if (response.data.status === "success") {
        console.log("OTP code verified!");
        //setOtpError("");
        onVerifySuccess();
        onCancel(false);
      } else {
        setErrorMessage("Otp is not valid, please enter it again");
        console.log("OTP verificatin is failed");
        setOtp("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function reSendCode(email) {
    try {
      console.log("Sending OTP request to server...");
      const response = await axios.post("http://localhost:3000/api/otp/send-otp", JSON.stringify({ email }));
      console.log("OTP response received:", response.data);

      if (response.data.status === "success") {
        //setShowVerificationBox(true);
        alert("re-Send code!");
      } else if (response.data.status === "fail") {
        console.error("Error sending OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }

  return (
    <div className="verification-box">
      <p className="description ">
        The verification code has been sent to your Email inbox. Please copy it to the input box below.
      </p>
      <div className="input-group">
        <label htmlFor="verificationCode">Verification Code</label>
        <input
          type="text"
          id="verificationCode"
          name="verificationCode"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="button-group">
        <button onClick={verifyCode} className="verify-button">
          Verify Code
        </button>
        <button onClick={reSendCode} className="send-button">
          Send New Code
        </button>
      </div>
      <div onClick={onCancel} className="cancel-group">
        <span className="cancel-icon">☚</span>
        <span className="cancel-text">Cancel</span>
      </div>
    </div>
  );
}
