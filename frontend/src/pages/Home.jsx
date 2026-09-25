
import Navbar from "../components/Navbar";
import homeImage from "../assets/home.jpg";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBriefcase,
  FaBuilding,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background Decorations */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl"></div>

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">

            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">

              {/* Small Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                Find your next opportunity
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Find Your
                <span className="block text-blue-600">
                  Dream Job
                </span>
                With Us
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
                Discover exciting career opportunities from top companies.
                Build your career with confidence and take the next step
                toward your future.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

                <Link
                  to="/job"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
                >
                  <FaSearch />
                  Browse Jobs
                  <FaArrowRight className="text-sm transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
                >
                  Get Started
                </Link>

              </div>

              {/* Features */}
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600 lg:justify-start">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  Easy Application
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  Trusted Companies
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  Career Growth
                </span>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Image Background */}
              <div className="absolute h-[280px] w-[280px] rounded-full bg-blue-100 blur-2xl sm:h-[400px] sm:w-[400px]"></div>

              <div className="relative">
                <img
                  src={homeImage}
                  alt="Job opportunities"
                  className="w-full max-w-md rounded-3xl object-cover shadow-2xl ring-1 ring-slate-200 sm:max-w-lg"
                />

                {/* Floating Card 1
                <div className="absolute -left-4 top-8 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FaBriefcase />
                    </div>

                    {/* <div>
                      <p className="text-xs text-slate-500">
                        Opportunities
                      </p>
                      <p className="font-bold text-slate-800">
                        Find Jobs
                      </p> */}
                    {/* </div>
                  </div>
                </div>  */}

                {/* Floating Card 2 */}
                {/* <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                      <FaBuilding />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Companies
                      </p>
                      <p className="font-bold text-slate-800">
                        Top Employers
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= QUICK STATS ================= */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 sm:grid-cols-4">

          <div className="px-4 py-7 text-center">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              100+
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Job Opportunities
            </p>
          </div>

          <div className="px-4 py-7 text-center">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              50+
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Companies
            </p>
          </div>

          <div className="px-4 py-7 text-center">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              500+
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Candidates
            </p>
          </div>

          <div className="px-4 py-7 text-center">
            <h3 className="text-2xl font-bold text-blue-600 sm:text-3xl">
              24/7
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Career Support
            </p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;

