import { Link, useNavigate } from "react-router-dom";
import { frontendLinks } from "../constants/index.js";
export default function Landing({
  isLoggedIn = true,
  userName = "Mary",
  days = 2,
  handleLogout = () => { },
  role,
}) {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate(frontendLinks.Register.path);
  };

  return (
    <div>
      <main className="relative isolate min-h-screen">
        <img
          src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          {isLoggedIn ? (
            role != "Admin" ? (
              <div>
                <h1 className="text-xl font-semibold leading-8 text-white">
                  Hello! Welcome Back, {userName}
                </h1>
                <p className="mt-10 text-lg text-black font-semibold">
                  You have been with us for{" "}
                  <span className="text-2xl text-white font-palanquin">
                    {days}
                  </span>{" "}
                  days
                </p>
                <div className="mt-8">
                  <button
                    className="bg-transparent rounded-full bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={logoutAndRedirect}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="font-montserrat text-xl font-semibold leading-8 text-white">
                  Hello! Welcome Back, {userName}
                </h1>
                <p className=" font-palanquin mt-10 text-lg text-black font-semibold">
                  You have been with us for{" "}
                  <span className="text-2xl text-white font-palanquin">
                    {days}
                  </span>{" "}
                  days
                </p>
                <p className="font-palanquin mt-5 text-lg text-black  ">
                  We are thrilled to have you here!
                </p>
                <p className="font-palanquin mt-1 text-lg text-black  ">
                  Looking forward to achieving great things together. 😊🌟
                </p>
                <div className="mt-8">
                  <button
                    className="  rounded-full bg-white px-4 py-1 text-sm   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                    onClick={logoutAndRedirect}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="mt-10 flex justify-center">
              <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-4 text-base text-white/70 sm:mt-6">
                  Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex justify-center">
                  <p className="text-sm  leading-7 text-white">
                    Already have an account?
                    <Link to="/login" className="font-semibold ">
                      {""} Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
