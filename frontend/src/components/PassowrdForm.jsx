import { useState, useEffect } from "react";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { frontendLinks } from "../constants/index.js";

export default function PassowrdForm({ token }) {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setRePasswordError("Passwords do not match!");

      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/auth/resetPassword/${token}`,
        {
          password,
          rePassword,
        }
      );
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
    setErrorMessage("");
    setRePasswordError("");
  }

  function handleRePasswordChange(e) {
    setRePassword(e.target.value);
    setErrorMessage("");
    setRePasswordError("");
  }

  useEffect(() => {
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 3000);
    }
  }, [redirectUrl]);

  return (
    <div className=" w-full max-w-sm lg:w-96 ">
      <div>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
          Reset your password
        </h2>
      </div>

      <div className="mt-10">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
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
                  id="rePassword"
                  name="rePassword"
                  type="password"
                  value={rePassword}
                  onChange={handleRePasswordChange}
                  required
                  className="block w-full rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="my-4">
                {errorMessage && <ErrorMsg msg={errorMessage} />}
                {rePasswordError && <ErrorMsg msg={rePasswordError} />}
              </div>
            </div>

            <div className="flex justify-center items-center flex-col">
              <button
                type="submit"
                className="custom-button "
              >
                Reset Password
              </button>
              <div className="text-sm leading-6 text-center mt-4">
                <a
                  href={frontendLinks.Register.path}
                  className="font-semibold text-indigo-600 hover:text-indigo-300"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
