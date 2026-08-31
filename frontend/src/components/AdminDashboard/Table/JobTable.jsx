import {useState,useEffect} from "react"
import API from "../../../Api/axios"
import ManageJobs from "../../../pages/Admin/ManageJob";
function JobTable(){
    const[jobs,setJobs]=useState([])
    const[loading,setLoading]=useState(true)
    const getalljob= async()=>{
        try{
            const api= await API.get("/job")
            setJobs(api.data.job)
        }catch(error){
            console.log("error fetching job:",error)
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        getalljob();
    },[])
    if(loading){
        return<h2 className="p-6 text-xl">Loadingjob...</h2>
    }
    const handledelete=async(id)=>{
        const confirmDelete= window.confirm("Are you sure you want delete the job");
        if(!confirmDelete)
            return;
        try{
            await API.delete(`/job/${id}`)
            setJobs((prevJobs)=>
                 prevJobs.filter((job) => job._id !== id))
            alert("job delete successfully")

        }catch(error){
            console.log(error);
            alert("delete failed")
        }
        
        
    }
   
    return(
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto">
            <h1 className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto">Manage jobs</h1>
            <table  className="w-full border-collapse">
                <thead>
                    <tr>
                       <th className="p-3 text-left">Tittle</th>
                       <th className="p-3 text-left">CompanyName</th>
                       <th className="p-3 text-left"> Location</th>
                       <th className="p-3 text-left">Salary</th>
                       <th className="p-3 text-left">status</th> 
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job)=>(
                        <tr
                        key={job.id}
                        className="border-b hover:bg-gray-100 transition"
                        >
                         <td  className="p-3">{job.tittle}</td>
                         <td  className="p-3">{job.companyName}</td>
                          <td  className="p-3">{job.location}</td>
                          <td className="p-3">{job.salary}</td>
                          <td className="p-3">
                            <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    job.status === "Active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                                {job.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {/* <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                                Edit
                            </button>
                    
                           */}
                            <button 
                            onClick={()=>handledelete(job._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                Delete
                            </button>
                          </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default JobTable;