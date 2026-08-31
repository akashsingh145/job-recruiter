import {useState,useEffect} from "react"
import API from "../../Api/axios"
function Profile(){
const[user,setUser]=useState({})
const[resume,setResume]=useState({})
const getProfile=async()=>{
    try{
        const api =await API.get("/users/profile")
        console.log(api.data);
        setUser(api.data.user)
        setResume(api.data.resume)
        console.log(api.data.resume)

    }catch(error){
        console.log(error)
    }
}
useEffect(()=>{
   getProfile();
},[])

    return(
        <div className="bg-slate-100 min-h-screen sm:p-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                My Profile</h1>
            <form className="space-y-5">
                <input
                 type="text"
        
                 value={user.username ||" " }readOnly
            placeholder="Enter Your Name"
            className="w-full border rounded-lg p-3"
            />
            <input
            type="text"
    
            value={user.email ||" " }readOnly
            placeholder="Enter Your Email"
            className="w-full border rounded-lg p-3"
            
            />
            <input
            type="text"
            
            value={user.phone ||" " } readOnly
            placeholder="Enter Your Phone Number"
            className="w-full border rounded-lg p-3"
            />
             <input
          type="text"
    
          value={user.role||" " }readOnly
          placeholder="Enter Your role"
          className="w-full border rounded-lg p-3"
          />
            <input
            type="text"
        
            value={resume.education ||" " }readOnly
            placeholder="Enter Your Education"
            className="w-full border rounded-lg p-3"
            />
          <input
          type="text"
    
          value={resume.experience ||" " } readOnly
          placeholder="Enter Your Experience"
          className="w-full border rounded-lg p-3"
          />
         
          <p className="w-full border rounded-lg p-3">
               {resume.skills||"no skills added"}
          </p>

            </form>
        </div>
        </div>
    )
}
export default Profile;