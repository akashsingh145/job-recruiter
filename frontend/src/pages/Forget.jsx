
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/forgot-password", {
        email,
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 py-8">

      {/* Main Card */}
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Top Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center text-white">

            <div className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">

              {/* Lock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7.5a4.5 4.5 0 0 0-9 0v3m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 1 18 21H6a1.5 1.5 0 0 1-1.5-1.5V12A1.5 1.5 0 0 1 6 10.5Z"
                />
              </svg>

            </div>

            <h1 className="text-2xl sm:text-3xl font-bold">
              Forgot Password?
            </h1>

            <p className="text-blue-100 mt-2 text-sm">
              No worries! We'll help you reset it.
            </p>

          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">

            {message && (
              <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                ✓ {message}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                ⚠ {error}
              </div>
            )}

            <p className="text-gray-600 text-sm leading-6 mb-6">
              Enter the email address associated with your account.
              We'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.69 5.55a2.25 2.25 0 0 1-2.42 0L2.25 6.75"
                      />
                    </svg>

                  </div>

                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </button>

            </form>

            {/* Back Login */}
            <div className="text-center mt-6">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-indigo-600 transition-colors"
              >
                <span>←</span>
                Back to Login
              </Link>

            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-xs mt-5">
          © {new Date().getFullYear()} Job Recurator. All rights reserved.
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
