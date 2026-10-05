import API from "../../../Api/axios"
import{useQuery,useQueryClient,useMutation} from "@tanstack/react-query"

function JobTable(){
    const getJob = async()=>{
        const api = await API.get("/job")
        console.log("JOB RESPONSE:",api.data)
        return api.data.job
    }
    // useQuery
    const{data:job=[],isLoading,isError}=useQuery({
        queryKey:["job"],
        queryFn: getJob
    })

    // queryClient
    const queryClient =useQueryClient()
    
    // delete
    const deleteJob = async(id)=>{
    const api = await API.delete(`/job/${id}`)
    return api.data.job
    }

    // deteteMutaion
     const  deleteMutation = useMutation({
         mutationFn:deleteJob,
         onSuccess:()=>{
            queryClient.invalidateQueries({
                querykey:["job"]
            })
            alert("job delete successfully")
         },
         onError:(error)=>{
            console.log(error)
            alert("job delete failed")
         }
     })
         const handledelete = async(id)=>{
            const confirmDelete = window.confirm("Are you sure you want delete the job")
            if(!confirmDelete){
                return
            }
            deleteMutation.mutate(id)
         }

        //  isloading
        if(isLoading){
            return(
                <h2 className="p-4 text-lg font-semibold ">loading...</h2>
            )
        }

        // isError
        if(isError){
            return(
                <h2 className="p-4 text-lg font-semibold"> job fetching error</h2>
            )
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
                    {job.map((job)=>(
                        <tr
                        key={job._id}
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