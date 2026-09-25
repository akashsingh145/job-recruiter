import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-300">

      {/* MAIN FOOTER  */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/*  LOGO & ABOUT  */}
          <div className="sm:col-span-2 lg:col-span-1">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/30">
                <FaBriefcase className="text-white text-lg" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Job Recruiter
              </h2>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400 max-w-sm">
              Find your dream job or hire the best talent with our
              recruitment platform.
            </p>

            <Link
              to="/job"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              Explore Jobs
              <FaArrowRight className="text-xs" />
            </Link>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-base sm:text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <FaHome className="text-xs" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/job"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <FaSearch className="text-xs" />
                  Job
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <FaSignInAlt className="text-xs" />
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition"
                >
                  <FaUserPlus className="text-xs" />
                  Register
                </Link>
              </li>

            </ul>

          </div>


          {/*  CONTACT */}
          <div>

            <h3 className="text-base sm:text-lg font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-blue-500 mt-1 shrink-0" />

                <p className="text-sm text-slate-400 break-all">
                  support@jobrecruiter.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500 shrink-0" />

                <p className="text-sm text-slate-400">
                  +91 9876543210
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500 shrink-0" />

                <p className="text-sm text-slate-400">
                  Lucknow, India
                </p>
              </div>

            </div>

          </div>


          {/* SOCIAL  */}
          <div>

            <h3 className="text-base sm:text-lg font-semibold text-white mb-5">
              Follow Us
            </h3>

            <p className="text-sm text-slate-400 leading-6 mb-5">
              Stay connected and follow us for the latest updates
              and opportunities.
            </p>

            <div className="flex gap-3">

              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300"
              >
                <FaFacebookF />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition duration-300"
              >
                <FaInstagram />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition duration-300"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

      </div>


      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">

            <p className="text-xs sm:text-sm text-slate-500">
              © {new Date().getFullYear()} Job Recruiter.
              All Rights Reserved.
            </p>

            <p className="text-xs sm:text-sm text-slate-500">
              Find. Apply. Grow.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;