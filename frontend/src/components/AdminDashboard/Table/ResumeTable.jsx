import {useState,useEffect} from "react"
import API from "../../../Api/axios";
function ResumeTable(){
const[resumes,setResumes]=useState([])
const[loading,setloadings]=useState(true)
const getAllResume = async()=>{
    try{
        const api =await API.get("/resume")
        setResumes(api.data.resumes)
    }catch(error){
          console.log("error fetching resume:",error)
    }finally{
        setloadings(false)
    }
    
}
useEffect(()=>{
    getAllResume()
},[])
if(loading){
    return<h2>loading..</h2>
}

const handleDelete =async(id)=>{
    const confirmDelete = window.confirm("Are You Sure You Want Delete Resume")
if(!confirmDelete){
    return;
}
try{
    await API.delete(`/resume/${id}`)
    setResumes((prevResumes)=>
                 prevResumes.filter((resume) => resume._id !== id))
            alert("resume delete successfully")

        }catch(error){
         console.log(error)
         alert("delete failed")
        
}

}   
    return(
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto">
            <h1 className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto"> Resume Table</h1>
            <table  className="w-full border-collapse">
                <thead>
                    <tr>
                        <td className="p-3 text-left">Name</td>
                        <td className="p-3 text-left">Skill</td>
                        <td className="p-3 text-left">Experience</td>
                        <td className="p-3 text-left">Education</td>
                        <td className="p-3 text-left">Resume File</td>
                    </tr>
                </thead>
                <tbody>
                    {resumes.map((resume)=>{
                        //  console.log("RESUME DATA:", resume);

                        return(
                            <tr
                            key={resume.id}
                             className="border-b hover:bg-gray-100 transition"
                            >
                                <td className="p-3">{resume.candidateName}</td>
                                <td className="p-3">{resume.skills}</td>
                                <td className="p-3">{resume.experience}</td>
                                <td className="p-3">{ resume.education}</td>
                                <td className="p-3">
                                   <a
                               href={`http://localhost:5000/uploads/${resume.resumeFile}`}
                                               target="_blank"
                                       rel="noopener noreferrer"
                                   className="bg-blue-600 text-white px-3 py-1 rounded"
                                             >
                                         View Resume
                                           </a>
                                </td>
                                <td>
                                    <button 
                                    onClick={()=>handleDelete(resume._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ResumeTable;