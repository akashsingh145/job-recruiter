// import { Link } from "react-router-dom";

// function JobCard({job}) {
//   console.log(job)
//   return (
//     <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition duration-300">

//       {/* Company */}
//       <p className="text-sm text-blue-600 font-semibold">
//         {job.companyName}
//       </p>

//       {/* Job Title */}
//       <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-2">
//         {job.tittle}
//       </h2>

//       {/* Location */}
//       <p className="text-slate-600 mt-2">
//             {job.location}
//       </p>

//       {/* Salary */}
//       <p className="text-slate-600 mt-2">
//                  {job.salary}
//       </p>

//       {/* Experience */}
//       <p className="text-slate-600 mt-2">
//               {job.experience}
//       </p>

//       {/* Job Type */}
//       <p className="text-slate-600 mt-2">
             
//       </p>

      

//       {/* Button */}
//       <Link
//         to={`/job/${job._id}`}
//         className="block mt-6 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
//       >
//         View Details
//       </Link>
 
//     </div>
//   );
// }

// export default JobCard;


import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaArrowRight,
  FaBuilding,
} from "react-icons/fa";

function JobCard({ job }) {
  const skills = job.skill
    ? job.skill
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl">

      {/* Top Accent */}
      <div className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/*  COMPANY */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
              <FaBuilding />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                {job.companyName || "Company"}
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Hiring now
              </p>
            </div>

          </div>

          {/* Job Type */}
          {job.type && (
            <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              {job.type}
            </span>
          )}

        </div>

        {/* ================= TITLE ================= */}
        <h2 className="mt-5 line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-blue-600">
          {job.tittle || "Job Title"}
        </h2>

        {/* ================= JOB INFO ================= */}
        <div className="mt-5 space-y-3">

          {/* Location */}
          {job.location && (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FaMapMarkerAlt className="w-4 shrink-0 text-blue-500" />
              <span className="truncate">
                {job.location}
              </span>
            </div>
          )}

          {/* Salary */}
          {job.salary && (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FaMoneyBillWave className="w-4 shrink-0 text-green-500" />
              <span>{job.salary}</span>
            </div>
          )}

          {/* Experience */}
          {job.experience && (
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <FaBriefcase className="w-4 shrink-0 text-purple-500" />
              <span>{job.experience}</span>
            </div>
          )}

        </div>

        {/*  SKILLS */}
        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">

            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}

            {skills.length > 4 && (
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                +{skills.length - 4} more
              </span>
            )}

          </div>
        )}

        {/* DIVIDER */}
        <div className="my-6 border-t border-slate-100"></div>

        {/* BUTTON */}
        <Link
          to={`/job/${job._id}`}
          className="group/button mt-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-100 transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          View Details

          <FaArrowRight className="text-xs transition-transform duration-300 group-hover/button:translate-x-1" />
        </Link>

      </div>
    </div>
  );
}

export default JobCard;
