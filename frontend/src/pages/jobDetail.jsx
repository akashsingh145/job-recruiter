
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaArrowLeft,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import API from "../Api/axios";

function JobDetail() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ================= GET JOB =================
  const getJob = async () => {
    try {
      const res = await API.get(`/job/${id}`);

      setJob(res.data.getJob);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, [id]);

  // ================= APPLY JOB =================
  const handleApply = async () => {
    const token = localStorage.getItem("token");

    // User not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.post("/application/apply", {
        jobId: job._id,
      });

      alert(res.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Application failed"
      );
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">

          <div className="animate-pulse">

            <div className="mb-6 h-5 w-32 rounded bg-slate-200"></div>

            <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">

              <div className="h-8 w-2/3 rounded bg-slate-200"></div>

              <div className="mt-4 h-5 w-1/3 rounded bg-slate-200"></div>

              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-12 rounded-xl bg-slate-200"
                  ></div>
                ))}

              </div>
            </div>

            <div className="mt-6 h-56 rounded-3xl bg-white shadow-sm"></div>

          </div>

        </div>
      </div>
    );
  }

  // ================= JOB NOT FOUND =================
  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
            <FaBriefcase />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-800">
            Job Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            This job may have been removed or is no longer available.
          </p>

          <Link
            to="/job"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaArrowLeft />
            Back to Jobs
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= TOP HEADER ================= */}
      <section className="border-b border-slate-100 bg-white">

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

          {/* Back */}
          <Link
            to="/job"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <FaArrowLeft className="text-xs" />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              {/* Company Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                <FaBuilding />
              </div>

              <div>

                <p className="text-sm font-semibold text-blue-600">
                  {job.companyName || "Company"}
                </p>

                <h1 className="mt-1 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                  {job.tittle}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Join the team and take the next step in your career.
                </p>

              </div>

            </div>

            {/* Job Type */}
            {job.type && (
              <span className="self-start rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
                {job.type}
              </span>
            )}

          </div>

        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6 lg:col-span-2">

            {/* Job Information */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Location */}
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {job.location || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <FaBriefcase />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Job Type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {job.type || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FaMoneyBillWave />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Salary
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {job.salary || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {job.experience || "Not specified"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Job Description
              </h2>

              <div className="mt-5 leading-8 text-slate-600">
                {job.description || "No description available."}
              </div>

            </div>

            {/* ================= REQUIREMENTS ================= */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Requirements
              </h2>

              <div className="mt-5">

                {job.requirements ? (
                  <p className="leading-8 text-slate-600">
                    {job.requirements}
                  </p>
                ) : (
                  <p className="text-slate-500">
                    No requirements specified.
                  </p>
                )}

              </div>

            </div>

            {/* ================= SKILLS ================= */}
            {job.skill && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <h2 className="text-xl font-bold text-slate-900">
                  Required Skills
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">

                  {job.skill
                    .split(",")
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                      >
                        {skill.trim()}
                      </span>
                    ))}

                </div>

              </div>
            )}

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside>

            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                Interested in this job?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Apply now and take the next step toward your career.
              </p>

              {/* Apply */}
              <button
                onClick={handleApply}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
              >
                Apply Now
                <FaCheckCircle />
              </button>

              <div className="my-6 border-t border-slate-100"></div>

              {/* Company */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Company
                </p>

                <p className="mt-2 font-semibold text-slate-800">
                  {job.companyName || "Company"}
                </p>
              </div>

              {/* Location */}
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Location
                </p>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <FaMapMarkerAlt className="text-blue-600" />
                  {job.location || "Not specified"}
                </p>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default JobDetail;

