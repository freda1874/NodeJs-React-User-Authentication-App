import React from "react";
import Background from "../components/Background";
import PassowrdForm from "../components/PassowrdForm";
import { useParams } from "react-router-dom";
import "./Register.css";

export default function ResetPassword() {
  const { token } = useParams();
  return (
    <div className="register-container">
      <div className="grid-container">
        <div className="register-left">
          <Background src="/images/background.jpg" alt="Register" text="Welcome to join our community" />
        </div>
        <div className="register-right">
          <PassowrdForm token={token} title="Reset your password" buttonText="Reset Password" />
        </div>
      </div>
    </div>
  );
}
