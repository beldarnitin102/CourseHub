import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import AuthLayout from "../components/auth/AuthLayout";
import { resetPassword } from "../services/operations/authAPI"; // Imported API function


export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate(); // Hook for redirection

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Executing API Call with parameters requested
      await resetPassword(
        formData.password,
        formData.confirmPassword,
        token,
        navigate
      );
    } catch (error) {
      console.error("Reset password failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl rounded-[32px] border border-white/50 bg-white p-10 shadow-2xl">
        
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
            <span className="font-bold text-white">CH</span>
          </div>
          <h1 className="text-3xl font-bold text-[#111827]">CourseHub</h1>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#111827]">Reset Password</h2>
        <p className="mt-3 text-gray-500">
          Create a strong password to secure your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB] disabled:bg-gray-100"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              disabled={loading}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB] disabled:bg-gray-100"
            />
          </div>

          {/* Show Password */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
            />
            Show Password
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>

        {/* Back */}
        <Link to="/login" className="mt-8 block text-center font-medium text-[#2563EB]">
          ← Back to Login
        </Link>

        {/* Debug Token */}
        {token && (
          <p className="mt-6 break-all text-xs text-gray-400">
            Token detected: {token.substring(0, 10)}...
          </p>
        )}
      </div>
    </AuthLayout>
  );
}