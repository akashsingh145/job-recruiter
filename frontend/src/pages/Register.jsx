import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Api/axios";
import {
  FaBriefcase,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaArrowRight,
  FaSignInAlt,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

    if (!formData.username) {
      alert("Please enter username");
      return;
    }

    if (!formData.email) {
      alert("Please enter email");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid Gmail address");
      return;
    }

    if (!formData.phone) {
      alert("Please enter phone number");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!formData.role) {
      alert("Please select role");
      return;
    }

    try {
      const api = await API.post("/users/send-register-otp", {
        email: formData.email,
      });

      alert(api.data.message);

      navigate("/otp-verification", {
        state: formData,
      });
    } catch (error) {
      console.log("SEND OTP ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 lg:p-14 flex-col justify-center relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>

              <span className="text-2xl font-bold">
                Job Recurator
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Start Your
              <span className="block text-blue-100">
                Career Journey
              </span>
            </h2>

            <p className="text-blue-100 mt-6 leading-7 max-w-md">
              Create your account and discover job opportunities
              that match your skills, experience and career goals.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Explore job opportunities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Create your professional profile
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Connect with recruiters
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12">

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-7">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white" />
            </div>

            <span className="text-xl font-bold text-slate-800">
              Job Recurator
            </span>

          </div>

          {/* Heading */}
          <div className="text-center md:text-left">

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Create Account
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Join Job Recurator and start your career journey
            </p>

          </div>

          <form onSubmit={handleSubmit} className="mt-7">

            {/* ================= USERNAME ================= */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* ================= EMAIL ================= */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Gmail"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

              <p className="text-xs text-slate-400 mt-1.5 ml-1">
                Only Gmail addresses are accepted
              </p>

            </div>

            {/* ================= PHONE ================= */}
            <div className="mb-4">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Phone Number
              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setformData({
                        ...formData,
                        phone: value,
                      });
                    }
                  }}
                  placeholder="Enter your phone number"
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* ================= ROLE ================= */}
            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Role
              </label>

              <div className="relative">

                <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full appearance-none border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 cursor-pointer"
                >
                  <option value="">Select Role</option>
                  <option value="jobseeker">Jobseeker</option>
                  <option value="admin">Admin</option>
                  <option value="interviewer">Interviewer</option>
                </select>

              </div>

            </div>

            {/* ================= SEND OTP ================= */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition duration-300"
            >
              Send OTP
              <FaArrowRight className="text-sm" />
            </button>

            {/* ================= DIVIDER ================= */}
            <div className="flex items-center gap-3 my-6">

              <div className="h-px bg-slate-200 flex-1"></div>

              <span className="text-xs text-slate-400">
                ALREADY REGISTERED?
              </span>

              <div className="h-px bg-slate-200 flex-1"></div>

            </div>

            {/* ================= LOGIN ================= */}
            <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 text-center">

              <p className="text-sm text-slate-600">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-indigo-600 transition"
              >
                <FaSignInAlt />
                Login to Account
              </Link>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}

export default Register;