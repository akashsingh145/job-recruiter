import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">Job Recruiter</h2>
          <p className="mt-3 text-sm text-gray-400">
            Find your dream job or hire the best talent with our recruitment
            platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/job" className="hover:text-blue-400">
                Job
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact
          </h3>
          <p>Email: support@jobrecruiter.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Lucknow, India</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400">
              Facebook
            </a>

            <a href="#" className="hover:text-pink-400">
              Instagram
            </a>

            <a href="#" className="hover:text-sky-400">
              LinkedIn
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-700 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} Job Recruiter. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;