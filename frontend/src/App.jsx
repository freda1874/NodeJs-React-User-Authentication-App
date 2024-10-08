
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";

import { UserProvider } from "./pages/UserProvider";

export default function App() {

  return (

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path={`/reset-password/:token`} element={<ResetPassword />} />
          <Route
            path="/landing"
            element={<Landing />}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>

  );
}
