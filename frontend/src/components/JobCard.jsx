import { Link } from "react-router-dom";

function JobCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

      {/* Company */}
      <p className="text-sm text-blue-600 font-semibold">
        Google
      </p>

      {/* Job Title */}
      <h2 className="text-2xl font-bold text-slate-800 mt-2">
        Frontend Developer
      </h2>

      {/* Location */}
      <p className="text-slate-600 mt-3">
        📍 Lucknow
      </p>

      {/* Salary */}
      <p className="text-slate-600 mt-2">
        💰 ₹8 LPA
      </p>

      {/* Experience */}
      <p className="text-slate-600 mt-2">
        💼 1-3 Years Experience
      </p>

      {/* Job Type */}
      <p className="text-slate-600 mt-2">
        🕒 Full Time
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          React
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Node.js
        </span>

        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
          MongoDB
        </span>
      </div>

      {/* Button */}
      <Link
        to="/jobs/1"
        className="block mt-6 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>

    </div>
  );
}

export default JobCard;