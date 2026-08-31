
import { useState, useEffect } from "react";
import API from "../../Api/axios";

function Offerletter() {
  const [offerletter, setOfferletter] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyofferletter = async () => {
    try {
      setLoading(true);

      const res = await API.get("/offerLetter/my");

console.log("FULL RESPONSE:", res.data);
console.log("OFFER LETTER:", res.data.offerletter);

      console.log("Offer Letter Response:", res.data);
      console.log("Offer Letters:", res.data.offerletter);

      setOfferletter(res.data.offerletter || []);

    } catch (error) {
      console.log(
        "Offer Letter Error:",
        error.response?.data || error.message
      );

      setOfferletter([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyofferletter();
  }, []);

  // ACCEPT
  const handleAccept = async (id) => {
    try {
      const res = await API.put(`/offerLetter/accepted/${id}`);

      console.log("Accept Response:", res.data);

      alert("Offer letter accepted");

      getMyofferletter();
    } catch (error) {
      console.log(
        "Accept Error:",
        error.response?.data || error.message
      );
    }
  };

  // REJECT
  const handleReject = async (id) => {
    try {
      const res = await API.put(`/offerLetter/reject/${id}`);

      console.log("Reject Response:", res.data);

      alert("Offer letter rejected");

      getMyofferletter();
    } catch (error) {
      console.log(
        "Reject Error:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          Loading offer letters...
        </h2>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Offer Letter
      </h1>

      {offerletter.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No offer letter found
          </h2>
        </div>
      ) : (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {offerletter.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {item.designation}
              </h2>

              <div className="space-y-2 text-gray-700">

                <p>
                  <strong>Candidate:</strong>{" "}
                  {item.candidateId?.username || "N/A"}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {item.companyName || "N/A"}
                </p>

                <p>
                  <strong>Job:</strong>{" "}
                  {item.jobId?.tittle || "N/A"}
                </p>

                <p>
                  <strong>Salary:</strong>{" "}
                  {item.salary || "N/A"}
                </p>

                <p>
                  <strong>Joining:</strong>{" "}
                  {item.joiningDate
                    ? new Date(item.joiningDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Status:</strong>

                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                      item.status === "accept"
                        ? "bg-green-100 text-green-700"
                        : item.status === "reject"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "sent"}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Offer Letter
                  </button>

                  <button
                    onClick={() => handleAccept(item._id)}
                    disabled={
                      item.status === "accept" ||
                      item.status === "reject"
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(item._id)}
                    disabled={
                      item.status === "accept" ||
                      item.status === "reject"
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>

                </div>

              </div>
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Offerletter;