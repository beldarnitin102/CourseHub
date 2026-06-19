import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Home />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Token comes from backend email link */}
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Default Route */}
      <Route
  path="*"
  element={<Navigate to="/" replace />}
/>
    </Routes>
  );
}