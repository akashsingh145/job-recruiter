import DashboardCard from "../../components/Dashboard/DashboardCard";
// import {useState,useEffect} from "react";
import{useQuery} from "@tanstack/react-query"
import API from "../../Api/axios"
import {
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaFilePdf,
  FaFileSignature,
} from "react-icons/fa";

// function  AdminDashboard() {
// const [stats,setStats]=useState({
//   totalUsers:"0",
//   totalResume:"0",
//   totalApplication:"0",
//   totalOfferLetter:"0"

// });
// useEffect(()=>{
// const adminDashboard = async()=>{
//   try{
//     const api =await API.get("/admin-dashboard")
//     console.log("ADMIN DASHBOARD DATA:", api.data);
//     setStats(api.data)
//   }catch(error){
// console.log(error)
//   }
// }
// adminDashboard();
// },[])
function AdminDashboard(){
  const adminDashboard = async()=>{
    const api = await API.get("/admin-dashboard")
    console.log("ADMIN DASHBOARD RESPONSE:",api.data)
    return api.data
  }
  const{data:stats=[],isLoading,isError}=useQuery({
    queryKey:["admin-dashboard"],
    queryFn:adminDashboard
  })
  if(isLoading){
    return(
      <h2 className="p-4 text-lg font-semibold">loading...</h2>
    )
  }
  if(isError){
    return(
      <h2 className="p-4 text-lg font-semibold">something went wrong</h2>
    )
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome to Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
        tittle="User"
        value={stats.totalUsers}
        icon={<FaUsers/>}
        />
        {/* <DashboardCard
          tittle="Applied Job"
          value={stats.AppliedJob}
          icon={<FaBriefcase />}
        /> */}

        <DashboardCard
          tittle="Resume"
          value={stats.totalResume}
          icon={<FaFilePdf />}
        />
        <DashboardCard
          tittle="Application"
          value={stats.totalApplication}
          icon={<FaFileAlt/>}
        />
        

        <DashboardCard
          tittle="Offer Letter"
          value={stats.totalOfferLetter}
          icon={<FaFileSignature />}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;