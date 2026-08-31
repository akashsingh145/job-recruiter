import { useEffect, useState } from "react";
import API from "../../../Api/axios";
import { useNavigate ,useLocation} from "react-router-dom";

function ApplicationTable() {
  const navigate = useNavigate()
  const location = useLocation()
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication,setSelectedApplication]=useState(null)


 
  const getApplications = async () => {
  try {
    const res = await API.get("/application");

    console.log("Applications:", res.data);

    setApplications(res.data.application || []);

  } catch (error) {
    console.log(
      "Get applications error:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getApplications();
  }, []);
      if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }
      const handledelete=async(id)=>{
        const confirmDelete= window.confirm("Are you sure you want delete the Application");
        if(!confirmDelete)
            return;
        try{
            await API.delete(`/application/${id}`)
            setApplications((prevApplication)=>
                 prevApplication.filter((application) => application._id !== id))
            alert("Application delete successfully")

        }catch(error){
            console.log(error);
            alert("delete failed")
        }
        
        
    }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-slate-800">
          Manage Applications
        </h2>

        <p className="text-gray-500 mt-1">
          View and manage candidate applications
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Candidate
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Job
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Resume
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">

            {applications.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No applications found
                </td>
              </tr>

            ) : (

              applications.map((application) => (

                <tr
                  key={application._id}
                  className="hover:bg-slate-50"
                >

                
                  <td className="px-6 py-4">

                    <div className="font-semibold text-slate-800">
                      {application.candidateId?.username || "N/A"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {application.candidateId?.email || "N/A"}
                    </div>

                  </td>
                  <td className="px-6 py-4">

                    <div className="font-semibold text-slate-800">
                      {application.jobId?.tittle || "N/A"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {application.jobId?.companyName || "N/A"}
                    </div>

                  </td>
                  <td className="px-6 py-4">

                    {application.resumeId ?.resumeFile? (
                      <button
                      onClick={() => {
        const resumeUrl = `http://localhost:5000/uploads/${application.resumeId.resumeFile}`;
        window.open(resumeUrl, "_blank");
      }}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View Resume
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        No Resume
                      </span>
                    )}

                  </td>


                
                  <td className="px-6 py-4">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {application.status}
                    </span>

                  </td>



                  <td className="px-6 py-4">

                    <button
                    onClick={()=>setSelectedApplication(application)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      View
                    </button>
                      {/* <button
                       onClick={() =>
                        console.log("Application ID:", application._id)

                       navigate(`/admin/createinterview/${application._id}`)
                        }}
                       className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                           >
                       Create Interview
                        </button> */}
                        <button
                    onClick={() => { if (location.pathname.startsWith("/admin")) {
                        navigate(`/admin/createinterview/${application._id}`);
               } else if (location.pathname.startsWith("/interviewer")) {
                navigate(`/interviewer/interviewercreateinterview/${application._id}`);
                   }
                    }}
               
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                 Create Interview
                    </button>
                    <button
                    onClick={()=>handledelete(application._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ">
                        Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
        </div>
        {/* modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
              <button
              onClick={()=>setSelectedApplication(null)}
               className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                close
              </button>
          
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Application Detail
              </h2>
            
             
              </div>
              <div  className="space-y-1"> 
                <p className="text-sm text-gray-500">Candidate Name</p>
                <p  className="font-semibold text-slate-800">{selectedApplication.candidateId?.username}</p>
              </div>
             <div  className="space-y-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-slate-800">{selectedApplication.candidateId?.email}</p>
             </div>
             <div   className="space-y-1">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold text-slate-800">{selectedApplication.candidateId?.phone}</p>
             </div>
             <div className="space-y-1">
              <p className="text-sm text-gray-500">job</p>
              <p className="font-semibold text-slate-800">{selectedApplication.jobId?.tittle}</p>
              </div>
              <div className="space-y-1">
              <p  className="text-sm text-gray-500">Company</p>
              <p className="font-semibold text-slate-800">{selectedApplication.jobId?.companyName}</p>
            </div>
            <div className="space-y-1">
              <p  className="text-sm text-gray-500"> Status</p>
              <span  className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700">{selectedApplication.status}</span>

            </div>
            <div>
                 {applications.resumeId ?.resumeFile? (
                      <button
                      onClick={() => {
        const resumeUrl = `http://localhost:5000/uploads/${application.resumeId.resumeFile}`;
        window.open(resumeUrl, "_blank");
      }}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        View Resume
                      </button>
                    ) : (
                      <span className="text-gray-400">
                        No Resume
                      </span>
                    )}

              </div> 
             </div>

</div>
          

       )} 
  
          
           
        

    </div>
  );
}

export default ApplicationTable;