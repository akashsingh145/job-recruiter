import { useEffect, useState } from "react";
import API from "../../../Api/axios";

function OfferLetterTable() {
  const [offerLetters, setOfferLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOfferLetters = async () => {
    try {
      const res = await API.get("/offerletter/");

    console.log("FRONTEND RESPONSE:", res.data);
    console.log("FRONTEND OFFER LETTERS:", res.data.offerletter);

      setOfferLetters(res.data.offerletter|| []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOfferLetters();
  }, []);
console.log("FINAL OFFER LETTERS:", offerLetters);
  if (loading) {
    return <p className="p-6">Loading...</p>;
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

            {offerLetters.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No offer letters found
                </td>
              </tr>
            ) : (
              offerLetters.map((offer) => (

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

                  {/* Action */}
                  <td className="p-3 border">

                    <button
                      onClick={() =>
                        window.open(
                          offer.offerLetter,
                          "_blank"
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
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