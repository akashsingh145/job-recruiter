import { useEffect, useState } from "react";
import API from "../../Api/axios";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyInterviews = async () => {
    try {
      const res = await API.get("/interview/my");

      console.log("My Interviews:", res.data);

      setInterviews(res.data.interviews || []);
    } catch (error) {
      console.log(
        "Interview fetch error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyInterviews();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading interviews...</h2>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Upcoming Interviews
      </h1>

      {interviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500">
            No interviews scheduled yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {interviews.map((item) => (
          
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
            >

              {/* Job */}
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                {item.jobId?.tittle || "Job"}
              </h2>

              {/* Candidate */}
              <p className="space-y-2 text-gray-700">
                <strong>Candidate Name: </strong>
                {item.candidateId?.username || "N/A"}
              </p>

              {/* Interviewer */}
              <p className="mt-2 text-gray-700">
                <strong>Interviewer: </strong>
                {item.interviewerName || "N/A"}
              </p>

              {/* Date */}
              <p className="mt-2 text-gray-700">
                <strong>Date: </strong>
                {item.interviewDate || "N/A"}
              </p>

              {/* Time */}
              <p className="mt-2 text-gray-700">
                <strong>Time: </strong>
                {item.interviewTime || "N/A"}
              </p>

              {/* Mode */}
              <p className="mt-2 text-gray-700">
                <strong>Mode: </strong>
                {item.interviewMode || "N/A"}
              </p>

              {/* Online */}
              {item.interviewMode === "online" && (
                <div className="mt-5">
                  <a
                    href={item.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Join Interview
                  </a>
                </div>
              )}

              {/* Offline */}
              {item.interviewMode === "offline" && (
                <div className="mt-5">
                  <p className="text-gray-700">
                    <strong>Venue: </strong>
                    {item.location || "N/A"}
                  </p>
                </div>
              )}

              {/* Status */}
              <div className="mt-5">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                  {item.status || "scheduled"}
                </span>
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Interviews;