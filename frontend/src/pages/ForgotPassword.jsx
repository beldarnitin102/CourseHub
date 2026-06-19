import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);

    // API CALL HERE

    setEmailSent(true);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl rounded-[32px] border border-white/50 bg-white p-10 shadow-2xl">

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB]">
            <span className="font-bold text-white">CH</span>
          </div>

          <h1 className="text-3xl font-bold text-[#111827]">
            CourseHub
          </h1>
        </div>

        {!emailSent ? (
          <>
            <h2 className="text-4xl font-bold text-[#111827]">
              Forgot Password?
            </h2>

            <p className="mt-3 text-gray-500">
              Enter your registered email and we'll send you a password reset link.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none focus:border-[#2563EB]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#2563EB] py-4 text-lg font-semibold text-white hover:bg-blue-700"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-[#111827]">
              Check Your Email
            </h2>

            <p className="mt-3 text-gray-500">
              We've sent a password reset link to:
            </p>

            <p className="mt-2 font-semibold text-[#2563EB]">
              {email}
            </p>

            <button
              onClick={() => setEmailSent(false)}
              className="mt-8 w-full rounded-xl bg-[#2563EB] py-4 text-white"
            >
              Resend Email
            </button>
          </>
        )}

        <Link
          to="/login"
          className="mt-8 block text-center font-medium text-[#2563EB]"
        >
          ← Back to Login
        </Link>

      </div>
    </AuthLayout>
  );
}