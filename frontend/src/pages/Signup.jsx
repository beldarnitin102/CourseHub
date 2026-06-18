import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";

export default function Signup() {
  const [accountType, setAccountType] = useState("Student");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

    console.log("Send OTP API Call");

    // API CALL HERE

    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      alert("Enter OTP");
      return;
    }

    console.log("Verify OTP");

    // VERIFY API HERE IF YOU CREATE ONE

    setOtpVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
      accountType,
    };

    console.log(signupData);

    // SIGNUP API CALL HERE
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
          Create Account
        </h2>

        <p className="mt-2 text-gray-500">
          Start your learning journey today.
        </p>

        {/* Account Type */}
        <div className="mt-8 flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setAccountType("Student")}
            className={`flex-1 rounded-lg py-3 font-medium transition ${
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
            className={`flex-1 rounded-lg py-3 font-medium transition ${
              accountType === "Instructor"
                ? "bg-[#2563EB] text-white"
                : "text-gray-600"
            }`}
          >
            Instructor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Names */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Email + Send OTP */}
          <div className="flex gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <button
              type="button"
              onClick={handleSendOTP}
              className="rounded-xl bg-[#2563EB] px-6 font-semibold text-white hover:bg-blue-700"
            >
              Send OTP
            </button>
          </div>

          {/* Contact */}
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
          />

          {/* Passwords */}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* OTP Section */}
          <div className="flex gap-3">
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              disabled={!otpSent}
              value={formData.otp}
              onChange={handleChange}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB] disabled:bg-gray-100"
            />

            <button
              type="button"
              disabled={!otpSent}
              onClick={handleVerifyOTP}
              className="rounded-xl bg-green-500 px-6 font-semibold text-white hover:bg-green-600 disabled:opacity-50"
            >
              Verify OTP
            </button>
          </div>

          {/* OTP Status */}
          {otpSent && !otpVerified && (
            <p className="text-sm text-blue-600">
              OTP sent successfully to your email.
            </p>
          )}

          {otpVerified && (
            <p className="text-sm font-medium text-green-600">
              ✓ OTP verified successfully
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!otpVerified}
            className="w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Account
          </button>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <span className="cursor-pointer font-semibold text-[#2563EB]">
              Login
            </span>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}