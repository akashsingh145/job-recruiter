
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Api/axios"

function Register() {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    username: "",
    email: "",
    phone: "",
    role: ""
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
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
      email: formData.email
    });

    alert(api.data.message);

    navigate("/otp-verification", {
      state: formData
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
    <section className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-6">
          Register your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Gmail"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-600 font-medium mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setformData({
                    ...formData,
                    phone: value
                  });
                }
              }}
              placeholder="Enter your phone number"
              maxLength={10}
              inputMode="numeric"
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-slate-600 font-medium mb-2">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="jobseeker">Jobseeker</option>
              <option value="admin">Admin</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

        </form>

        <p className="text-center text-slate-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Register;

