
import React from 'react';
import { Link, Outlet } from 'react-router';

const AdminDashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold">Admin Panel</div>
        </div>
        {/* Page Content */}
        <div className="p-4 md:p-10 w-full">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"/>
        <ul className="menu p-4 w-64 min-h-full bg-blue-200 text-base-content">
          {/* Sidebar content here */}
          <li className="text-2xl font-semibold p-4">Admin Panel</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/admin-dashboard/profile">Admin Profile</Link></li>
          <li><Link to="/admin-dashboard/aaddsclorship">Add Scholarship</Link></li>
          <li><Link to="/admin-dashboard/manage-scholarship">Manage Scholarship</Link></li>
          <li><Link to="/admin-dashboard/manage-applied-application">Manage Applied Application</Link></li>
          <li><Link to="/admin-dashboard/manage-users">Manage Users</Link></li>
          <li><Link to="/admin-dashboard/manage-review">Manage Review</Link></li>
          <li><Link to="/admin-dashboard/analytics">Analytics</Link></li>
        </ul>    
      </div>
    </div>
  );
};

export default AdminDashboard;
