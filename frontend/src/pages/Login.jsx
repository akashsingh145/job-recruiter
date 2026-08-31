import{Link,useNavigate} from "react-router-dom"
import { useState } from "react";
import API from "../Api/axios";

function Login(){
const navigate =useNavigate();
const[formData,setformData]=useState({
    email:"",
    password:""
})
const handleChange=(e)=>{
    setformData({...formData,
        [e.target.name]:e.target.value})
}
// api call
const handleSubmit = async (e)=>{
    console.log("login button clicked")
    e.preventDefault();
    try{
const api =await API.post("/users/login" ,formData)
localStorage.setItem("token", api.data.token);
localStorage.setItem("user", JSON.stringify(api.data.user));

console.log("Response",api.data)
alert(api.data.message)

const role = api.data.user.role;

if (role === "admin") {
  navigate("/admin/dashboard");
} else if (role === "interviewer") {
  navigate("/interviewer/dashboard");
} else {
  navigate("/user/dashboard");
}
    }catch(error){
alert(error.message);

    }
}
    return(
        <section className="min-h-screen bg-slate-100 flex justify-center items-center px-5 py-10">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl  font-bold text-center text-slate-800">
                Welcome Back</h1>
                <p className="text-center text-slate-600 font-medium text-sm sm:text-base mt-2">
                    Login to your job recuirement account</p>
                <form onSubmit={handleSubmit} 
                className="mt-8">
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
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    </div>
                    {/* password */}
                    <div className="mb-4">
                        <label className="block text-slate-600 font-medium mb-2"> Password:</label>
                        <input
                        type="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"

                        />
                        <div className="flex justify-end mb-4">
                   <Link
    to="/forgot-password"
    className="text-sm font-medium text-blue-600 hover:text-indigo-600 hover:underline"
  >
    Forgot Password?
  </Link>
</div>
                    </div>
                    {/* button */}
                    <button
                    type="submit"
                     className="w-full mb-4 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                        Login
                    </button>

                    {/* Register */}
                    <p className="text-center mt-6 text-slate-600"> 
                        Do Not Have Account? {" "}
                        <Link 
                        to="/register" 
                        className="text-blue-600 font font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                    </form>
            </div>
        </section>
         );
}
export default Login;


