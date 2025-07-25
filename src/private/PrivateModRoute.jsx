import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateModRoute = ({ children }) => {
  const { user, userRole, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || userRole === null || userRole === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== 'moderator') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateModRoute;
