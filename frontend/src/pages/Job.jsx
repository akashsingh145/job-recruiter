
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import { useState, useEffect } from "react";
import { FaSearch, FaBriefcase, FaFilter } from "react-icons/fa";
import API from "../Api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getAllJob = async () => {
    try {
      const res = await API.get("/job");
      setJobs(res.data.job || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJob();
  }, []);

  // Search jobs
  const filteredJobs = jobs.filter((job) => {
    const title = job.tittle || "";

    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* ================= PAGE HEADER ================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700">

          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative mx-auto max-w-7xl px-5 py-14 text-center sm:px-8">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl text-white backdrop-blur-sm">
              <FaBriefcase />
            </div>

            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Find Your Next Opportunity
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Explore exciting job opportunities and take the next step
              toward your career.
            </p>

            {/* ================= SEARCH ================= */}
            <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">

              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search by job title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 w-full rounded-xl bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none ring-1 ring-transparent transition placeholder:text-slate-400 focus:bg-white focus:ring-blue-500"
                />
              </div>

              <button
  type="button"
  onClick={() => setSearch(searchInput)}
  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
>
  <FaSearch />
  Search
</button>

            </div>
          </div>
        </section>

        {/* ================= JOB LIST ================= */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          {/* Top row */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="mb-1 text-sm font-semibold text-blue-600">
                JOB OPPORTUNITIES
              </p>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Latest Jobs
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {loading
                  ? "Finding available jobs..."
                  : `${filteredJobs.length} ${
                      filteredJobs.length === 1 ? "job" : "jobs"
                    } found`}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm">
              <FaFilter className="text-blue-600" />
              <span>All Jobs</span>
            </div>

          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-200"></div>

                  <div className="mt-5 h-5 w-3/4 rounded bg-slate-200"></div>

                  <div className="mt-3 h-4 w-1/2 rounded bg-slate-200"></div>

                  <div className="mt-6 h-4 w-full rounded bg-slate-200"></div>
                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-200"></div>

                  <div className="mt-6 h-10 w-full rounded-xl bg-slate-200"></div>
                </div>
              ))}

            </div>
          )}

          {/* ================= JOB CARDS ================= */}
          {!loading && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                />
              ))}

            </div>
          )}

          {/* ================= NO JOB FOUND ================= */}
          {!loading && filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                <FaSearch />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No jobs found
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find any jobs matching your search.
                Try searching with a different job title.
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Clear Search
                </button>
              )}

            </div>
          )}

        </section>
      </main>
    </>
  );
}

export default Jobs;
