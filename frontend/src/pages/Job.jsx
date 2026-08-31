import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import { useState,useEffect } from "react";
import API from "../Api/axios";
function Jobs() {
   const[jobs, setJobs]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("")
    console.log(jobs[0]);
  //   const filteredJobs = jobs.filter((job) =>
  //       console.log("Job:", job.tittle)
  // console.log("Match:", job.tittle.toLowerCase().includes(search.toLowerCase()));

  // job.tittle.toLowerCase().includes(search.toLowerCase())
    
  const filteredJobs = jobs.filter((job) => {
  console.log("Job:", job.tittle);
  console.log(
    "Match:",
    job.tittle.toLowerCase().includes(search.toLowerCase())
  );

  return job.tittle.toLowerCase().includes(search.toLowerCase());
});

// console.log(filteredJobs);
    const getAllJob = async(req,res)=>{
try{
  const res =await API.get("/job")
// console.log(res.data);
  setJobs(res.data.job);  
}catch(error){
  console.log(error)
}finally{
  setLoading(false)
}
};
useEffect(()=>{
  getAllJob()
},[])
  return (
   
    <>
      <Navbar />

      <section className="bg-slate-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-4">
          <SearchBar
          
  search={search}
  setSearch={setSearch}
/> 

          <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-800">
            Latest Jobs
          </h1>

          <p className="text-center text-slate-600 mt-3">
            Find your dream job from top companies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {loading ? (
                     <h2>Loading...</h2>
                            ) : (
                                  filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                           ))
                          )}
          </div>

        </div>

      </section>
    </>
  );
}

export default Jobs;