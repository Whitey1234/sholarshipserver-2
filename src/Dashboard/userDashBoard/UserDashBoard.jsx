import { Menu } from 'lucide-react';
import React, { use, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const UserDashBoard = () => {
     const [showSidebar, setShowSidebar] = useState(false);
     const {user} = use(AuthContext)
     //console.log(user.displayName)
    return (
        <div>
            <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Topbar with Toggle Button */}
      <div className="flex md:hidden justify-between items-center p-4 bg-blue-600 text-white">
         <button onClick={() => setShowSidebar(!showSidebar)}>
          <Menu size={24} />

        </button>
         <span className='text-black text-2xl'>  {user.displayName}s </span>
        <h1 className="text-lg font-semibold" > Dashboard</h1>
       
      </div>

      {/* Sidebar */}
      <div
        className={`bg-blue-100 md:block w-full md:w-64 p-6 space-y-4 ${
          showSidebar ? 'block' : 'hidden'
        } md:h-auto fixed md:static z-10 top-16 left-0 shadow-md md:shadow-none`}
      >
        <h2 className="text-xl font-bold hidden md:block">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            Home
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/user-dashboard/applications"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            My Application
          </NavLink>
          <NavLink
            to="/user-dashboard/reviews"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
            }
          >
            My Reviews
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 mt-4 md:mt-0">
        <Outlet />
      </div>
    </div>
        </div>
    );
};

export default UserDashBoard;