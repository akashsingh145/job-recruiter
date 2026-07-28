import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
function Jobs() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">
          <SearchBar />

          <h1 className="text-4xl font-bold text-center text-slate-800">
            Latest Jobs
          </h1>

          <p className="text-center text-slate-600 mt-3">
            Find your dream job from top companies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>

        </div>

      </section>
    </>
  );
}

export default Jobs;