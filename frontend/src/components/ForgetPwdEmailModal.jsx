import { useState } from "react";
import axios from "axios";
import ErrorMsg from "./ErrorMsg";
import { MdOutlineCancel } from "react-icons/md";

export default function ForgetPwdEmailModal({ onClose, email, setEmail }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_URL;


  async function sendLink(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgetPassword`,
        { email }
      );
      if (response.data.status === "success") {
        setErrorMessage("");
        setSuccessMessage(
          "Link sent to your email"
        );


      } else {
        setSuccessMessage("");
        setErrorMessage("Failed to send password reset email.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Error sending reset email:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  }





  return (
    <div className="bg-white shadow sm:rounded-lg">

      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Reset Password
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>password reset link will be sent to your email </p>
        </div>
        <form className="mt-5 sm:flex sm:items-center" onSubmit={sendLink}>
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onSubmit={sendLink}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Send
          </button>
        </form>

        {errorMessage && <ErrorMsg msg={errorMessage} />}

        {successMessage && (
          <ErrorMsg msg={successMessage} className="text-green-500" />
        )}
        <div className="flex justify-center mt-8">
          <MdOutlineCancel onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
