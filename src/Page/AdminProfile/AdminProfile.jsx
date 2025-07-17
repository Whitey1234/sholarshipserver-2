import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const AdminProfile = () => {
  const { user, userRole } = useContext(AuthContext);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <img
          src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.jpg'}
          alt="User"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold text-gray-800">{user?.displayName}</h2>
        <p className="text-gray-500">{user?.email}</p>
        {userRole !== 'user' && (
          <span className="inline-block mt-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Role: {userRole}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
