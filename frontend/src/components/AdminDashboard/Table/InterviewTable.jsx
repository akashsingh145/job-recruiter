import { useNavigate ,useLocation} from "react-router-dom";

import { useEffect, useState } from "react";
import API from "../../../Api/axios";
console.log("🔥 INTERVIEW TABLE COMPONENT LOADED");
function InterviewTable() {
    const navigate = useNavigate()
  const location = useLocation()
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const[selectedInterview,setSelectedInterview]=useState(null)

  const getAllInterview = async () => {
    try {
        console.log("🔥 GET INTERVIEW START");
      const res = await API.get("/interview");

      console.log("INTERVIEW DATA:", res.data);

      setInterviews(res.data.interview || []);
    } catch (error) {
      console.log("INTERVIEW ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      console.log("🔥 USE EFFECT RUNNING");
    getAllInterview();
  }, []);

  if (loading) {
    return <h2 className="p-6">Loading...</h2>;
  }
  const handleDelete =async(id)=>{
    const confirmDelete =window.confirm("are you sure you want delete interview")
    if(!confirmDelete)
      return;
    try{
       await API.delete(`/interview/${id}`)
            setInterviews((prevInterview)=>
                 prevInterview.filter((interview) => interview._id !== id))
            alert("Interview delete successfully")

        }catch(error){
            console.log(error);
            alert("delete failed")

    

    }
  
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6 overflow-x-auto">

      <h1 className="text-2xl font-bold mb-6">
        Interview Table
      </h1>

      {interviews.length === 0 ? (
        <p className="text-gray-500">
          No interviews found
        </p>
      ) : (
        <table className="w-full border-collapse">

          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Candidate</th>
              <th className="p-3 text-left">Job</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Interviewer</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Mode</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>

            {interviews.map((interview) => (

              <tr
                key={interview._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-3">
                  {interview.candidateId?.username || "N/A"}
                </td>

                <td className="p-3">
                  {interview.jobId?.tittle || "N/A"}
                </td>

                <td className="p-3">
                  {interview.jobId?.companyName || "N/A"}
                </td>

                <td className="p-3">
                  {interview.interviewerName || "N/A"}
                </td>

                <td className="p-3">
                  {interview.interviewDate || "N/A"}
                </td>

                <td className="p-3">
                  {interview.interviewTime || "N/A"}
                </td>

                <td className="p-3">
                  {interview.interviewMode || "N/A"}
                </td>

                <td className="p-3">
                  {interview.status || "scheduled"}
                </td>
                <td>
                       {/* <button
                    onClick={() => { if (location.pathname.startsWith("/admin")) {
                        navigate(`/admin/createofferletter/${interview.application._id || interview.applicationId}`);
               } else if (location.pathname.startsWith("/interviewer")) {
                navigate(`/interviewer/interviewercreateofferletter/${interview.application._id || interview.applicationId}}`);
                   }
                    }}
               
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                 Create offerletter
                    </button> */}
                    <td className="p-3">
  <button
    onClick={() => {
      const applicationId =
        interview.applicationId?._id || interview.applicationId;

      console.log("Application ID:", applicationId);

      if (!applicationId) {
        alert("Application ID not found");
        return;
      }

      if (location.pathname.startsWith("/admin")) {
        navigate(`/admin/createofferletter/${applicationId}`);
      } else if (location.pathname.startsWith("/interviewer")) {
        navigate(
          `/interviewer/interviewercreateofferletter/${applicationId}`
        );
      }
    }}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
  >
    Create offerletter 
  </button>
</td>
                    </td>
                <td className="p-3">
                <button
                onClick={()=>handleDelete(interview._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                
                  delete
                </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default InterviewTable;