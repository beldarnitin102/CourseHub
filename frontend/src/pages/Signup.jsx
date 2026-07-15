import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { sendOTP, signup } from "../services/operations/authAPI";

export default function Signup() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("Student");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      alert("Please enter email first");
      return;
    }

    try {
      setLoading(true);

      await sendOTP(formData.email);

      setOtpSent(true);
      alert("OTP sent successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signup(
        {
          ...formData,
          accountType,
        },
        navigate,
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {" "}
      <div className="w-full max-w-2xl rounded-[32px] border border-white/50 bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
            <span className="font-bold text-white">CH</span>
          </div>

          <h1 className="text-3xl font-bold text-[#111827]">CourseHub</h1>
        </div>

        <h2 className="text-4xl font-bold text-[#111827]">Create Account</h2>

        <p className="mt-2 text-gray-500">Start your learning journey today.</p>

        <div className="mt-8 flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setAccountType("Student")}
            className={`flex-1 rounded-lg py-3 font-medium ${
              accountType === "Student"
                ? "bg-[#2563EB] text-white"
                : "text-gray-600"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setAccountType("Instructor")}
            className={`flex-1 rounded-lg py-3 font-medium ${
              accountType === "Instructor"
                ? "bg-[#2563EB] text-white"
                : "text-gray-600"
            }`}
          >
            Instructor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className="rounded-xl bg-[#2563EB] px-6 font-semibold text-white"
            >
              {otpSent ? "Resend OTP" : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <p className="text-sm text-green-600">
              OTP sent successfully. Check your email.
            </p>
          )}

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-semibold text-[#2563EB]"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
