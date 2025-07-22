// import React, { useContext } from 'react';
import { Link } from 'react-router'; // Change to 'react-router-dom' if needed

import Lottie from 'lottie-react';
import { AuthContext } from '../../Provider/AuthProvider';
import { use } from 'react';
import logo from '../../../logo.json'

const Nav = () => {
  // 🔐 Get user and logout from AuthContext (currently not in use)
  const { user, logout, userRole } = use(AuthContext);

  // 🔘 Logout handler (commented out since logout is not available)
  const handleLogoutClick = () => logout();

  return (
    <div className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar py-3 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 ">
            <div className="rounded-3xl overflow-hidden w-10 h-10">  {/* 40px = 2.5rem = 10 in Tailwind */}
  <Lottie animationData={logo} loop={true} />
</div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden lg:inline">
              
                    EduScholar Hub
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal space-x-4">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li><Link to="/all-scholarship" className="hover:text-accent">All Sholarship</Link></li>

              {/* ✅ Only show these nav items if user is logged in (commented out now) */}
              {user && (
                <>
                  
                  {(userRole === 'admin' )&&(
                      <li><Link to="/admin-dashboard" className="hover:text-accent">Admin Dashboard</Link></li>
                    )
                  }
                   {(userRole === 'moderator' )&&(
                      <li><Link to="/moderetor-dashboard" className="hover:text-accent">Moderetor Dashboard</Link></li>
                    )
                  }
                  
                  {(userRole === 'user' ||userRole === 'moderator' || userRole === 'admin'  )&&(
                      <li><Link to="/user-dashboard" className="hover:text-accent"> Dashboard</Link></li>
                    )
                  }
                  
                 
                </>
              )}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}

            {/* ✅ Auth UI (login/logout/profile) - commented out temporarily */}
            {user ? (
              <>
                <button
                  onClick={handleLogoutClick}
                  className="btn btn-sm btn-outline text-white border-white hover:border-accent hover:text-accent"
                >
                  Logout
                </button>
                <div className="dropdown dropdown-end tooltip tooltip-bottom" data-tip={user.displayName}>
                  <div tabIndex={0} className="avatar">
                    <div className="w-8 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                      <img src={user.photoURL} alt="Profile" />
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 text-black rounded-box w-52 p-2 shadow">
                    <li><span>{user.displayName}</span></li>
                    <li><span>{user.email}</span></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm text-white border-white hover:border-accent hover:text-accent">Login</Link>
                <Link to="/signup" className="btn btn-outline btn-sm text-white border-white hover:border-accent hover:text-accent">Sign Up</Link>
              </>
             )} 
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu dropdown-content mt-2 p-3 shadow bg-base-100 rounded-box w-52 text-blue-700">
              <li><Link to="/">Home</Link></li>
            <li><Link to="/all-scholarship" className="hover:text-accent">All Sholarship</Link></li>

              {/* ✅ Mobile nav items (commented out user-based links) */}
              {user && (
                <>
                  
                  {(userRole === 'admin' )&&(
                      <li><Link to="/admin-dashboard" className="hover:text-accent">Admin Dashboard</Link></li>
                    )
                  }
                   {(userRole === 'moderator' )&&(
                      <li><Link to="/moderetor-dashboard" className="hover:text-accent">Moderetor Dashboard</Link></li>
                    )
                  }
                  
                  {(userRole === 'user' ||userRole === 'moderator' || userRole === 'admin'  )&&(
                      <li><Link to="/user-dashboard" className="hover:text-accent"> Dashboard</Link></li>
                    )
                  }
                  
                 
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
