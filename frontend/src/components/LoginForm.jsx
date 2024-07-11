import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";
import ForgetPwdEmailModal from "./ForgetPwdEmailModal";
import ErrorMsg from "./ErrorMsg";
import { frontendLinks } from "../constants/index";

export default function LoginForm() {
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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      if (response.data.status === "success") {
        // Get JWT from backend and save it in the localStorage
        const token = response.data.token;
        localStorage.setItem("token", token);
        setErrorMessage("");
        setLoginSuccessMessage("You have successfully logged in!");
        navigate("/landing");
        setRedirectUrl(response.data.redirectUrl);
      } else if (response.data.status === "fail") {
        setErrorMessage(response.data.message);
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
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
    <div className=" w-full max-w-sm lg:w-96 ">
      {loginSuccessMessage && <Alert msg={loginSuccessMessage} />}

      <div>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
          Welcome Back!
        </h2>
      </div>
      <div className="mt-3">
        {showForgetPwdEmailModal && (
          <ForgetPwdEmailModal
            onClose={closeForgetPasswordModal}
            email={email}
            setEmail={setEmail}
          />
        )}
      </div>
      <div>
        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full flex-1 rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-lg bg-gray-200  border-0  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>
            {errorMessage && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className={`custom-button ${showForgetPwdEmailModal ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={showForgetPwdEmailModal}
            >
              Log in
            </button>
          </div>

          <div
            className={`flex items-center justify-evenly mt-6 ${showForgetPwdEmailModal ? "pointer-events-none opacity-50" : ""
              }`}
          >
            <Link
              to={frontendLinks.Register.path}
              className=" block text-sm leading-6 hover:font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>

            <div
              className={`cursor-pointer text-sm leading-6 hover:font-semibold text-indigo-600 hover:text-indigo-500 ${showForgetPwdEmailModal ? "pointer-events-none" : ""
                }`}
              onClick={handleForgotPasswordClick}
            >
              <div className="block"> Forgot password?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
