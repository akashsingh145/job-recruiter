import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import {useNavigate}from "react-router-dom";
import API from "../Api/axios"
function jobDetail(){
const {id} =useParams();
const [job,setJob]=useState(null);
const[loading,setloading]=useState(true);
const navigate = useNavigate();

const getJob = async(req ,res)=>{
    try{
        const res =await API.get(`/job/${id}`)
        setJob(res.data.getJob)

    }catch(error){
        console.log(error)
    }finally{
        setloading(false)
    }

};
useEffect(()=>{
    getJob()
},[])
if (loading) {
  return <h1>Loading...</h1>;
}
// const handleApply = async()=>{
//     try{
//         const api = await API.post("/application/apply",
//             {
//                 jobId:job._id,

//             },
//             {
//                 headers:
//                 {
//                     "Authorization":`Bearer ${localStorage.getItem ("token")}`
//                 }
//             }

//         )
//         alert(api.data.message)

//     }catch(error){
//         console.log(error)
//         alert(error.response?.data?.message||"application failed")

//     }
//



const handleApply = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await API.post("/application/apply", {
      jobId: job._id
    });

    alert(res.data.message);

  } catch (error) {
    alert(
      error.response?.data?.message || "Application failed"
    );
  }
};

    return(
        
        <div className="min-h-screen bg-gray-100 py-8">
            {/* back button */}
            <div className="max-w-6xl mx-auto">
                <Link to="/job"
                className="text-cyan-600 font-semibold hover:underline"
                >
                 Back to Job
                </Link>
                {/* header */}
                <div className="bg-white rounded-xl shadow-md p-8 mt-4">
                     <h1 className="text-4xl font-bold text-slate-800"> {job?.tittle}</h1>
                     <h2 className="text-xl text-gray-500 mt-2">{job?.tittle}</h2>
 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-cyan-500"/>
                        <span>{job?.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaBriefcase className="text-cyan-500"/>
                        <span>{job?.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        < FaMoneyBillWave className="text-cyan-500"/>
                        <span>{job?.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        < FaClock className="text-cyan-500"/>
                        <span> {job?.experience}</span>
                    </div>

                 </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-8 mt-4">
                    <h2 className="text-2xl font-bold mb-4"> Job Description</h2>
                <p className="text-gray-600 leading-8">{job?.description}
                    </p>
                </div>
                
                {/* <div className="bg-white rounded-xl shadow-md p-8 mt-4">
                    <h2 className="text-2xl font-bold mb-4"> Required Skill</h2>
                    <p className="text-gray-600 leading-8"> {job?.skill}</p>
                </div>  */}
                {/* requirement */}
                <div className="bg-white rounded-xl shadhow-md p-8 mt-4">
                <h2 className="text-2xl font-bold mb-4">Requirement</h2>
                <p className="text-gray-600 leading-8"> { job?.requirements}</p>
                  </div>

                  {/* about company */}
                  {/* <div className="text-2xl rounded-xl shadow-md p-8 mt-4"> 
                    <h2 className="text-2xl font-bold mb-4"> About Company</h2>
                    <p className="text-gray-600 leading-8"> {job?.companyDescription}
                    </p>
                  </div> */}
                  <div className="mt-8 flex justify-center">
                    <button onClick={handleApply} 
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-lg text-lg font-semibold">
                      Apply Button
                    </button>
                  </div>

            </div>
        </div>
    )
}
export default jobDetail;