import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VerificationBox from "./VerificationBox";
import Alert from "./Alert";
import { frontendLinks } from "../constants/index";
import ErrorMsg from "./ErrorMsg";

import { validateEmail, validatePassword } from "./VerifyEmail&PSW.js";

export default function RegisterForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerificationBox, setShowVerificationBox] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      setPassword("Invalid Password");
      return;
    }

    const dataToSend = {
      nickname: nickname.trim(),
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        dataToSend
      );
      if (response.data.status === "success") {
        console.log("Success to save user data");
        setSignupMessage(
          "Successfully signed up! Redirecting to login page..."
        );
        navigate("/");
      } else if (response.data.status === "fail") {
        console.log("Failed to save user data");
      }
    } catch (error) {
      console.error(error);
    }

    console.log("Register form submitted");
  }

  async function handleVerify(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      return;
    }
    setShowVerificationBox(true);
    //setLoading(true);

    try {
      console.log("Sending OTP request to server...");
      const response = await axios.post(
        "http://localhost:3000/api/otp/send-otp",
        { email }
      );
      console.log("OTP response received:", response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError("");

  }

  function handlePasswordChang(e) {
    setPassword(e.target.value);
    setPasswordError(""); // Clear password error when typing

  }

  function handleCancel() {
    setShowVerificationBox(false);
  }

  return (
    <div className=" w-full max-w-sm lg:w-96 ">
      {showVerificationBox && (
        <VerificationBox
          email={email}
          onCancel={handleCancel}
          onVerifySuccess={() => setIsEmailVerified(true)}
        />
      )}

      {signupMessage && <Alert msg={signupMessage} />}

      <div>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
          {isEmailVerified ? "Verification Successful!" : "Create your Account"}
        </h2>
      </div>

      <div className="mt-10">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nick Name
              </label>
              <div className="mt-2  ">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your name here"
                  required
                  className="block w-full rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  defaultValue="adamwathan@gmail.com"
                  required
                  placeholder="you@example.com"
                  disabled={isEmailVerified}
                  className="block w-full flex-1 rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {!isEmailVerified && (
                  <button
                    className="custom-button w-fit flex-shrink-0 bg-amber-300 "
                    onClick={handleVerify}
                  >
                    Verify
                  </button>
                )}

                {isEmailVerified && (
                  <button
                    className="custom-button w-fit flex-shrink-0"
                    disabled
                  >
                    Verified!
                  </button>
                )}

              </div>
              {emailError && <ErrorMsg msg={emailError} />}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChang}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {passwordError && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  {passwordError}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`custom-button ${!isEmailVerified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={!isEmailVerified}
              >
                Sign up
              </button>
            </div>
            <div className="text-sm leading-6 text-center">
              Already have a account? {""}
              <a
                href={frontendLinks.Login.path}
                className="font-semibold text-indigo-600 hover:text-indigo-300"
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
