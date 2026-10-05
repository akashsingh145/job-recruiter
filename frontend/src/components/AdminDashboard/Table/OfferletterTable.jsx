import API from "../../../Api/axios"
import{useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
function OfferLetterTable(){ 
  const getOfferLetter = async()=>{ 
    const api = await API.get("/offerletter/")
    console.log("OFFERLETTER RESPONSE:",api.data)
     return  api.data.offerletter
    
  }
// useQuery
const {data:offerletter=[],isLoading,isError}=useQuery({
  queryKey:["offerletter"],
  queryFn: getOfferLetter
})

// queryClient

const queryClient = useQueryClient()

// delete 
const deleteOfferletter =async(id)=>{
  const api = await API.delete(`/offerletter/${id}`)
   return api.data.offerletter
}

// useMutation
const deleteMutation = useMutation({
    mutationFn:deleteOfferletter,
    onSuccess:()=>{
     queryClient.invalidateQueries({
      queryKey:["offerletter"]
     })
     alert("offerletter delete successfully")
    },
    onError:(error)=>{
      console.log (error)
      alert("offerletter delete failed")
    }
  })
  const handleDelete= async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want delete the offer letter")
    if(!confirmDelete){
      return
    }
    deleteMutation.mutate(id)
  }

  // isLoding
  if(isLoading){
    return(
      <h2 className="p-4 text-lg font-semibold">loading...</h2>
    )
  }
  // isError
  if(isError){
    return(
      <h2 className="p-4 text-lg font-semibold"> fetching offerletter error</h2>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Offer Letters
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100 text-left">

              <th className="p-3 border">
                Candidate
              </th>

              <th className="p-3 border">
                Email
              </th>

              <th className="p-3 border">
                Job
              </th>

              <th className="p-3 border">
                Salary
              </th>

              <th className="p-3 border">
                Joining Date
              </th>

              <th className="p-3 border">
                Status
              </th>

               <th className="p-3 border">
                Action
              </th>

            </tr>
          </thead>

          <tbody>

            {offerletter.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No offer letters found
                </td>
              </tr>
            ) : (
              offerletter.map((offer) => (

                <tr key={offer._id}>

                  {/* Candidate */}
                  <td className="p-3 border">
                    {offer.candidateId?.username || "N/A"}
                  </td>

                  {/* Email */}
                  <td className="p-3 border">
                    {offer.candidateId?.email || "N/A"}
                  </td>

                  {/* Job */}
                  <td className="p-3 border">
                    {offer.jobId?.tittle || "N/A"}
                  </td>

                  {/* Salary */}
                  <td className="p-3 border">
                    ₹{offer.salary || "N/A"}
                  </td>

                  {/* Joining Date */}
                  <td className="p-3 border">
                    {offer.joiningDate
                      ? new Date(
                          offer.joiningDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Status */}
                  <td className="p-3 border">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        offer.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : offer.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {offer.status || "pending"}
                    </span>

                  </td>
                   {/* DELETE ACTION */}
                  <td className="p-3 border">

                    <button
                      onClick={() =>
                        handleDelete(offer._id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                  </td>


                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default OfferLetterTable;