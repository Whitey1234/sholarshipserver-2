import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const UserProfile = () => {
  const { user, userRole } = useContext(AuthContext);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || 'https://i.ibb.co/5vJ8YxP/user.png'}
          alt="User"
          className="w-28 h-28 object-cover rounded-full border-4 border-blue-300"
        />
        <h2 className="text-2xl font-bold mt-4">{user?.displayName || 'Unknown User'}</h2>
        {userRole !== 'user' && (
          <p className="mt-2 text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
            Role: {userRole}
          </p>
        )}
      </div>

      <div className="mt-6 space-y-4 text-center">
        <p>
          <span className="font-semibold text-gray-600">Email:</span>{' '}
          {user?.email || 'Not Available'}
        </p>
        <p>
          <span className="font-semibold text-gray-600">User ID:</span>{' '}
          {user?.uid || 'Unavailable'}
        </p>
        {/* You can show more info like join date, applications, etc. */}
      </div>
    </div>
  );
};

export default UserProfile;
