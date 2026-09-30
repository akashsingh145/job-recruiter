import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { useState } from "react";
import{loginUser} from "../store/userSlice"
import API from "../Api/axios";
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUserPlus,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // api call
  const handleSubmit = async (e) => {
    console.log("login button clicked");
    e.preventDefault();

    try {
      const api = await API.post("/users/login", formData);

      localStorage.setItem("token", api.data.token);
      localStorage.setItem("user", JSON.stringify(api.data.user));

        dispatch(loginUser(api.data.user));

      console.log("Response", api.data);
      alert(api.data.message);

      const role = api.data.user.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "interviewer") {
        navigate("/interviewer/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 lg:p-14 flex-col justify-center relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-white/10 rounded-full"></div>

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

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Find Your
              <span className="block text-blue-100">
                Dream Career
              </span>
            </h2>

            <p className="text-blue-100 mt-6 leading-7 max-w-md">
              Connect with opportunities, discover the right jobs,
              and take the next step toward your career goals.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Discover new opportunities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Apply to jobs easily
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-blue-100">
                  Build your career
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-14">

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">
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
              Welcome Back!
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Login to your Job Recurator account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">

            {/* Email */}
            <div className="mb-5">
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
                  placeholder="Enter your email"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-6">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-indigo-600 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl transition duration-300"
            >
              Login
              <FaArrowRight className="text-sm" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-xs text-slate-400">
                OR
              </span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Register */}
            <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-indigo-600 transition"
              >
                <FaUserPlus />
                Create an Account
              </Link>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;