import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosSecure from "../../Hooks/useAxiosSecure";
import { FiTrash2, FiUser, FiUsers, FiShield, FiFilter } from "react-icons/fi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredRole, setFilteredRole] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", `User role updated to ${newRole}`, "success");
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update user role", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          setUsers((prev) => prev.filter((user) => user._id !== id));
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete user", "error");
      }
    }
  };

  const filteredUsers =
    filteredRole === "all"
      ? users
      : users.filter((user) => user.role === filteredRole);

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FiShield className="text-red-500" />;
      case "moderator":
        return <FiUsers className="text-blue-500" />;
      default:
        return <FiUser className="text-green-500" />;
    }
  };

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold">Manage Users</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <FiFilter className="text-gray-500" />
          <select
            value={filteredRole}
            onChange={(e) => setFilteredRole(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm w-full sm:w-auto"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="sm:hidden space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No users found.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow border"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      <span className="text-xs capitalize">{user.role}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center pt-3 border-t">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="border px-2 py-1 rounded text-xs"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete user"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-6">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            className="border px-2 py-1 rounded text-sm"
                          >
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;