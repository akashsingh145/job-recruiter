import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Api/axios";

function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      alert("OTP must be 6 digits");
      return;
    }

    if (!password) {
      alert("Please enter password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!confirmPassword) {
      alert("Please enter confirm password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      const api = await API.post("/users/verify-register-otp", {
        ...formData,
        otp,
        password,
        confirmPassword
      });

      alert(api.data.message);

      navigate("/login");

    } catch (error) {
      console.log("VERIFY OTP ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Verify Your Email
        </h1>

        <p className="text-center text-slate-500 text-sm mb-6">
          Enter the OTP sent to your email and create your password.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              OTP
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 6) {
                  setOtp(value);
                }
              }}
              placeholder="Enter 6 digit OTP"
              maxLength={6}
              inputMode="numeric"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Verify & Register
          </button>

        </form>

      </div>
    </section>
  );
}

export default OTPVerification;