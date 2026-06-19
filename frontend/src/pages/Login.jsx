import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // LOGIN API CALL HERE
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-2xl rounded-[32px] border border-white/50 bg-white p-10 shadow-2xl">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
            <span className="font-bold text-white">CH</span>
          </div>

          <h1 className="text-3xl font-bold text-[#111827]">
            CourseHub
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-[#111827]">
          Welcome Back
        </h2>

        <p className="mt-2 text-gray-500">
          Continue your learning journey.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none transition focus:border-[#2563EB]"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#2563EB] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-4 pr-14 outline-none transition focus:border-[#2563EB]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm text-gray-400">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Signup Redirect */}
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#2563EB]"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}