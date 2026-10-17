import DashboardCard from "../../components/Dashboard/DashboardCard";
// import {useState,} from 'react'
import{useQuery} from "@tanstack/react-query"
import API from "../../Api/axios";
import {
  FaBriefcase,
  FaFileAlt,
  FaCalendarAlt,
  FaFileSignature,
} from "react-icons/fa";
import AppliedJob from "./AppliedJob";
import Offerletter from "./Offerletter";

function Dashboard() {
// const[stats,setStats] =useState({
//    AppliedJob:"0",
//    Resume:"not submitted",
//    Interview:"0",
//    Offerletter:"0"
// })

// useEffect(()=>{
// const getDashboard =async()=>{
// try{
//    const res =await API.get("/user-dashboard")
//   setStats(res.data.data)

// }catch(error){
//   console.log(error)
// }
 
// }
// getDashboard();
// },[])
const getDashboard =async()=>{
  const api = await API.get("/user-dashboard")
  console.log("RESPONSE USER-DASHBOARD API:",api.data)
  return api.data.data
}
const{data:stats=[],isLoading,isError}=useQuery({
  querykey:['user-dashboard'],
  queryFn:getDashboard
})
// const queryClient =useQueryClient()
// const dashboardMutation = useMutation({
//   mutationFn:getDashboard,
//   onSuccess:()=>{
//     queryClient.invalidateQueries({
//       querykey:["user-dashboard"]
//     })
//   },
//   onError:(error)=>{
//     console.log(error)
//   }
// })
if(isLoading){
  return(
    <h2 className="p-4 font-semibold text-lg">loading...</h2>
  )
}
if(isError){
  return(
    <h2 className ="p-4 text-lg font-semibold"> dashboard fetching Error</h2>
  )
}
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Welcome to User Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          tittle="Applied Job"
          value={stats.AppliedJob}
          icon={<FaBriefcase />}
        />

        <DashboardCard
          tittle="Resume"
          value={stats.Resume}
          icon={<FaFileAlt />}
        />

        <DashboardCard
          tittle="Interview"
          value={stats.Interview}
          icon={<FaCalendarAlt />}
        />

        <DashboardCard
          tittle="Offer Letter"
          value={stats.Offerletter}
          icon={<FaFileSignature />}
        />
      </div>
    </div>
  );
}

export default Dashboard;