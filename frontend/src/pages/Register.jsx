import { useState } from "react";
import{Link,useNavigate} from "react-router-dom"
import API from "../Api/axios";
function Register(){

    const navigate = useNavigate();
    const[formData,setformData]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        role:"user"

    })
    const handleChange=(e)=>{
        setformData({...formData,
            [e.target.name]:e.target .value

        })
    }
        const handleSubmit=async(e)=>{
            e.preventDefault();
             if (formData.password !== formData.confirmPassword) {
    alert("Password and Confirm Password do not match");
    return;
  }
            try{
                const api = await API.post("/users/register",formData)
                alert(api.data.message);
                navigate("/login")
            }

                catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.error || error.response?.data?.message);

            }
        }
    
    return(
        <section className="min-h-screen bg-slate-100 flex justify-center items-center px-5 py-10">
<div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
<h1 className="text-3xl text-center font-bold text-slate-800">
    Create Account</h1>
<p className="text-center text-slate-600 font-medium text-sm sm:text-base mt-2">
    Join Job Recruiter and start your career journey </p>
<form onSubmit={handleSubmit}
className="mt-8">
    {/* username */}
    <div className="mb-5">
        <label className="block text-slate-600 font-medium mb-2 ">
            Username:
        </label>
        <input
        type="name"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter Your Username"
        className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        
    </div>
    {/* email */}
    <div className="mb-5">
        <label className="block text-slate-600 font-medium mb-2">
             Email:</label>
        <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Your Email"
        className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
    {/* phone */}
    <div className="mb-5">
        <label className="block text-slate-600 font-medium mb-2">
             Contact Number</label>
        <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter Your Number"
        className="w-full border border-slate-200 rounded-lg  px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {/* role */}
    <div className="mb-4">
        <label className="block mb-2 font-medium text-slate-700"> Role</label>
        
        <select className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
             name="role"
            value={formData.role}
            onChange={handleChange}>
            <option value =" ">Select Role</option>
           
            <option value ="jobseeker">Jobseeker</option>
            <option value="admin">Admin</option>
            <option value="interviewer">Interviewer</option>
        </select>
    </div>
    {/* password */} 
    <div className="mb-5">
        <label className="block text-slate-600 font-medium mb-2 ">
            Password</label>
        <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Your Password"
        minLength={8}
        className=" w-full border border-slate-200 rounded-lg  px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
    {/* confirm password */}
    <div className="mb-5">
        <label className="   block text-slate-600 font-medium mb-2 ">  
            Confirm Password</label>
    <input
    type="Password" 
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    placeholder="Enter Confirm Password"
    className=" w-full border border-slate-200 rounded-lg  px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
    {/* register button */}
<button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>

          {/* Login Link */}

          <p className="text-center mt-6 text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
            </p>
              
</form>
</div>
        </section>
    
    );
}
export default Register;