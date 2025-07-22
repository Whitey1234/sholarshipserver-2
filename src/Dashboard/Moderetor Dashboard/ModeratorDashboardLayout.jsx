import { Link, Outlet } from "react-router";
import { FaUser, FaClipboardList, FaStar, FaPlus, FaThList, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ModeratorDashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Mobile menu button */}
      <div className="md:hidden bg-blue-700 p-4 flex justify-between items-center text-white">
        <h2 className="text-xl font-bold">Moderator Panel</h2>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-blue-700 text-white w-full md:w-64 p-4 space-y-4 z-20 md:relative fixed top-0 left-0 h-full transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-center mb-4 hidden md:block">Moderator Panel</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/moderetor-dashboard"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaUser /> My Profile
            </Link>
          </li>
          <li>
            <Link
              to="manage-scholarshipsmod"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaThList /> Manage Scholarships
            </Link>
          </li>
          <li>
            <Link
              to="allreview"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaStar /> All Reviews
            </Link>
          </li>
          <li>
            <Link
              to="applied-scholarships"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaClipboardList /> All Applied Scholarships
            </Link>
          </li>
          <li>
            <Link
              to="addscholarship"
              className="flex items-center gap-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              <FaPlus /> Add Scholarship
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:ml-0 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default ModeratorDashboardLayout;
