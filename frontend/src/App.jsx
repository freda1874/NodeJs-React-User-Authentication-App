import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import { frontendLinks } from "./constants/index";
import { UserProvider } from "./UserContext";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path={frontendLinks.Register.path} element={<RegisterPage />} />
          <Route path={frontendLinks.Login.path} element={<Login />} />
          <Route path={`${frontendLinks.ResetPassword.path}/:token`} element={<ResetPassword />} />
          <Route path={frontendLinks.Landing.path} element={<Landing />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
