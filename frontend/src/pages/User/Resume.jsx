
// import Navbar from "../../components/Dashboard/Navbar"
// import Sidebar from"../../components/Dashboard/Sidebar"
import {useState} from "react"
import API from"../../Api/axios"

 function Resume(){
const [formData,setFormData]=useState({
    username:"",
    skills:"",
    experience:"",
    education:"",
    resume:""
});
const[resumeFile,setResumeFile]=useState(null);
const handleChange=(e)=>{
    

    setFormData({...formData,
    [e.target.name]:e.target.value})
};
const handleFileChange=(e)=>{
    setResumeFile(e.target.files[0]);
}
// API call
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const data =new FormData();
        data.append("username",formData.username);
        data.append("skills",formData.skills);
        data.append("experience",formData.experience);
        data.append("education",formData.education);
        data.append("resumeFile",resumeFile);
         const api = await API.post("/resume/upload",data,{
            headers:{
                "content-type":"multipart/form-data"
            }
         })
         alert(api.data.message)
         setFormData({
            username:"",
            skills:"",
            experience:"",
            education:"",
            resume:""
         })
         setResumeFile(null)
    
    }
    catch(error){
        alert(error.response?.data?.message ||"Resume Upload Failed")
    }
}

    return(
        
            <div className= " flex justify-center items-center sm:p-8">
            <div className=" w-full max-w-2xl bg-white shadow-lg rounded-xl sm:p-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Upload Resume</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                type= "Text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input
                type= "text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Skill"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                className=" w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Education"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="file"
                name="resumeFile"
            accept=".pdf"
                onChange={handleFileChange}
                placeholder=".Pdf"
                className=" w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                
                />
                <button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 rounded-lg transition duration-300"
                >
                Upload Resume</button>
            </form>
         
        </div>
    </div>
    )
}

 export default Resume;