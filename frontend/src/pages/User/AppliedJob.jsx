// import {useState,useEffect} from "react";
// import{useNavigate} from "react-router-dom"

// import API from "../../Api/axios"
// function AppliedJob() {
// const navigate=useNavigate()


// const [applications,setApplications]=useState([]);
// const[loading,setLoading]=useState(true);

// const getApplications =async()=>{
//     try{
//         const res = await API.get("/application/my")
//          console.log("Applied Jobs Response:", res.data);

//         setApplications(res.data.applications)
//     }catch(error){
//         // console.log (error)
//         console.log("ERROR RESPONSE:", error.response?.data);

//         alert(error.response?.data?.message||" Failed to fetch applications")
//     }
// finally{
//     setLoading(false)
// }

// }
// useEffect(()=>{
//     getApplications()
// },[])
// if(loading){ 
//     return(
//     <div className="p-6">
//         <h1>Loading..</h1>
//     </div>
//     )
// }

import API from "../../Api/axios"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import {useNavigate} from "react-router-dom"
function AppliedJob(){
  const navigate =useNavigate()
  const applyJob =async()=>{
    const api = await API.get("/application/my")
    console.log("APPLICATION API RESPONSE:",api.data)
    return api.data.applications
  }
  // useQuery
  const{data:applications=[],isLoading,isError}=useQuery({
    queryKey:["application"],
    queryFn:applyJob
  })
  // queryClient
  const queryClient = useQueryClient()
  // useMutation
  const applicationMutation = useMutation({
    mutationFn:applyJob,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["application"]
      })
    },
    onError:(error)=>{
      console.log("error")
      
    }
  })

  // isLoading
  if(isLoading){
    return(
      <h2 className ="p-4 text-lg font-semibold">
        loading...
      </h2>
    )
  }
  // isError
  if(isError){
    return(
      <h2 className = "p-4 text-lg font-semibold">
        applied job fetching error
      </h2>
    )
  }

  return (
    <div className=" bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          My Applied Jobs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                { item.jobId?.tittle}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Company:</span>
                  {item.jobId?.companyName}
                </p>

                <p>
                  <span className="font-semibold">Location:</span>
                  {item.jobId?.location}
                </p>

                <p>
                  <span className="font-semibold">Job Type:</span>
                  {item.jobId?.type}
                </p>

                <p>
                  <span className="font-semibold">Salary:</span>
                  {item.jobId?.salary}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>
                  <span className="ml-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {item.status}
                  </span>
                </p>
              </div>

              
            
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button onClick= {() => navigate(`/job/${item.jobId._id}`)}

          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  View Job
                </button>
                </div>
                
              </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedJob;