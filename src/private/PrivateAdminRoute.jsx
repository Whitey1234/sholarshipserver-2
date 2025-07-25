import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateAdminRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait until user and role are fully loaded
  if (loading || !user || userRole === null || userRole === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span> 
      </div>
    );
  }

  if (userRole !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateAdminRoute;
