import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyProfile = () => {
  const { user,userRole } = useContext(AuthContext);

  return (
    <div className="max-w-xl mx-auto p-4 mt-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
        My Profile
      </h2>

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <img
          src={user?.photoURL || "https://i.ibb.co/SN8Ch7r/profile.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
        />

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold">{user?.displayName || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-lg font-semibold">{user?.email || "N/A"}</p>
          </div>

          {
            user !== "user" && (
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold capitalize text-green-600">{userRole}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
