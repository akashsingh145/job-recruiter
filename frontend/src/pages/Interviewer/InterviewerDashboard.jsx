import DashboardCard from "../../components/Dashboard/DashboardCard";
// import {useState,useEffect} from "react"
import API from "../../Api/axios";
import{useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {
  FaFileAlt,
  FaFileSignature,
  FaFilePdf,
} from "react-icons/fa";

function InterviewerDashboard() {

  // const[stats,setStats]=useState({
  //   resume:"0",
  //   applicatiom:"0",
  //   offerletter:"0"
  // })
  // useEffect(()=>{
  //  const interviewerDashboard = async()=>{
  //   try{
  //       const api = await API.get("/interviewer-dashboard")
  //       setStats(api.data)
  //   }catch(error){
  //        console.log(error)
  //   }
  //  }
  //  interviewerDashboard() 
  // },[])

  const getInterviewerDashboard =async()=>{
    const api = await API.get("/interviewer-dashboard")
    console.log("RESPONSE INTERVIEWER-DASHBOARD API:",api.data)
    
    return api.data
    
  }
  const{data:stats=[],isLoading,isError}=useQuery({
    queryKey:["interviewer-dashboard"],
    queryFn:getInterviewerDashboard
  })
  
  if(isLoading){
    return(
      <h2 className ="p-4 text-lg font-semibold">
        loading...
      </h2>
    )
  }
  if(isError){
    return(
      <h2 className ="p-4 text-lg font-semibold">Something went wrong</h2>
    )
  }
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome to Interviewer Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    

        <DashboardCard
          tittle="Resume"
          value={stats.resume}
          icon={<FaFilePdf />}
        />

        <DashboardCard
          tittle="Application"
          value={stats.application}
          icon={<FaFileAlt />}
        />

        <DashboardCard
          tittle="Offer Letter"
          value={stats.offerletter}
          icon={<FaFileSignature />}
        />
      </div>
    </div>
  );
}

export default InterviewerDashboard;