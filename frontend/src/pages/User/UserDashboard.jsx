import DashboardCard from "../../components/Dashboard/DashboardCard";
import {useState,useEffect} from 'react'
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
const[stats,setStats] =useState({
   AppliedJob:"0",
   Resume:"not submitted",
   Interview:"0",
   Offerletter:"0"
})
useEffect(()=>{
const getDashboard =async()=>{
try{
   const res =await API.get("/user-dashboard")
  setStats(res.data.data)

}catch(error){
  console.log(error)
}
 
}
getDashboard();
},[])

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