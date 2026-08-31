import { Link } from "react-router-dom";

function JobCard({job}) {
  console.log(job)
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition duration-300">

      {/* Company */}
      <p className="text-sm text-blue-600 font-semibold">
        {job.companyName}
      </p>

      {/* Job Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
        {job.tittle}
      </h2>

      {/* Location */}
      <p className="text-slate-600 mt-2">
            {job.location}
      </p>

      {/* Salary */}
      <p className="text-slate-600 mt-2">
                 {job.salary}
      </p>

      {/* Experience */}
      <p className="text-slate-600 mt-2">
              {job.experience}
      </p>

      {/* Job Type */}
      <p className="text-slate-600 mt-2">
             
      </p>

      

      {/* Button */}
      <Link
        to={`/job/${job._id}`}
        className="block mt-6 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>
 
    </div>
  );
}

export default JobCard;