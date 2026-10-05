
import API from "../../../Api/axios"
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
 function ResumeTable(){
    const getResume = async()=>{
        const api = await API.get("/resume/")
        console.log ("RESUME API RESPONSE:", api.data)
        return api.data.resumes
    }
    // useQuery
    const{data:resumes=[],isLoading,isError}=useQuery({
        queryKey:["resume"],
        queryFn:getResume
    })
          const queryClient = useQueryClient()
    
        const deleteResume = async(id)=>{
            const api =await API.delete(`/resume/${id}`)
            return api.data.resume
        }
        // deleteMutation
        const deleteMutation = useMutation({
            mutationFn:deleteResume,
            onSuccess:()=>{
                queryClient.invalidateQueries({
                   queryKey:["resume"] 
                })
                alert("Resume delete Successfully ")
            },
            onError:(error)=>{
                console.log(error)
                alert("resume delete failed")
            }

        })

        // handleDelete
        const handledelete = async(id)=>{
            const confirmDelete = window.confirm("Are you sure you want delete this resume")
            if(!confirmDelete){
                return
            }
            deleteMutation.mutate(id)
        }
        // isloading
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
                   resume fetching error..
                </h2>
            )
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
                                    onClick={()=>handledelete(resume._id)}
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