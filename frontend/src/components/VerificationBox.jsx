

import axios from "axios";
import { Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { TfiEmail } from "react-icons/tfi";
import ErrorMsg from "./ErrorMsg"

export default function VerificationBox({ email, onCancel, onVerifySuccess }) {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  // const API_URL = import.meta.env.VITE_BACKEND_URL;

  async function verifyCode(e) {

    e.preventDefault();
    console.log("OTP submitted:", otp);

    try {
      const response = await axios.post("/api/otp/verify-otp", { email, otp });

      if (response.data.status === "success") {
        console.log("OTP code verified!");
        //setOtpError("");
        onVerifySuccess();
        setOpen(false);
      } else {
        setErrorMessage("Otp is not valid, please enter it again");
        console.log("OTP verificatin is failed");
        setOtp("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while verifying the OTP. ");
    }
  }

  async function reSendCode(email) {
    try {
      console.log("Sending OTP request to server...");
      const response = await axios.post("/api/otp/verify-otp", JSON.stringify({ email }));
      console.log("OTP response received:", response.data);
      if (response.data.status === "fail") {
        console.error("Error sending OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }


  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TfiEmail />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Verification Code

                    </DialogTitle>



                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The verification code has been sent to your Email inbox.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-center ">
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={otp}
                    placeholder="Please paste your code here "
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-60  placeholder:text-slate-400 rounded-lg    border-1  py-1.5   text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                </div>
                {errorMessage && <ErrorMsg msg={errorMessage} />}
                <div className="mt-20 sm:mt-4  flex  justify-center gap-10 sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={reSendCode}
                  >
                    Send New Code
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-amber-100 sm:ml-3 sm:w-auto"
                    onClick={verifyCode}
                  >
                    Verify  Code
                  </button>


                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition >
  );
}
