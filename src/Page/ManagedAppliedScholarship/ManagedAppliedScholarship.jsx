import { useEffect, useState } from "react";
import { FaEye, FaCommentAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosSecure from "../../Hooks/useAxiosSecure";

const ManagedAppliedScholarships = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axiosSecure.get("/get-applied-scholarships");
        setApplications(res.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/applied-scholarships/${id}`, {
          status: "rejected",
        });
        setApplications(
          applications.map((app) =>
            app._id === id ? { ...app, status: "rejected" } : app
          )
        );
        Swal.fire("Rejected!", "Application has been rejected.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to reject application.", "error");
      }
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/applied-scholarships/${selectedApp._id}/feedback`, {
        feedback,
      });
      setApplications(
        applications.map((app) =>
          app._id === selectedApp._id ? { ...app, feedback } : app
        )
      );
      Swal.fire("Feedback Sent!", "", "success");
      setSelectedApp(null);
      setFeedback("");
      setFeedbackModal(false);
    } catch (error) {
      Swal.fire("Error!", "Failed to send feedback.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        All Applied Scholarships
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Mobile View - Cards */}
          <div className="sm:hidden space-y-3">
            {applications.map((app) => (
              <div key={app._id} className="bg-white p-3 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{app.userName}</h3>
                    <p className="text-sm text-gray-600">{app.universityName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    app.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    app.status === "approved" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {app.status}
                  </span>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Degree:</span> {app.subjectCategory}
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span> {app.scholarshipCategory}
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between pt-2 border-t">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setDetailsModal(true);
                    }}
                    className="text-blue-500 p-1"
                  >
                    <FaEye size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedback(app.feedback || "");
                      setFeedbackModal(true);
                    }}
                    className="text-green-500 p-1"
                  >
                    <FaCommentAlt size={16} />
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className="text-red-500 p-1"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                      {app.userName}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                      {app.universityName}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                      {app.subjectCategory}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                      {app.scholarshipCategory}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                        app.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        app.status === "approved" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setDetailsModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 p-1"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setFeedback(app.feedback || "");
                            setFeedbackModal(true);
                          }}
                          className="text-green-500 hover:text-green-700 p-1"
                        >
                          <FaCommentAlt size={16} />
                        </button>
                        <button
                          onClick={() => handleCancel(app._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTimes size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Details Modal */}
      {selectedApp && detailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-lg p-5 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Application Details
              </h3>
              <button
                onClick={() => {
                  setSelectedApp(null);
                  setDetailsModal(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-medium w-28">Name:</span>
                <span>{selectedApp.userName}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">University:</span>
                <span>{selectedApp.universityName}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Degree:</span>
                <span>{selectedApp.subjectCategory}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Category:</span>
                <span>{selectedApp.scholarshipCategory}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-28">Status:</span>
                <span className={`capitalize ${
                  selectedApp.status === "pending" ? "text-yellow-600" :
                  selectedApp.status === "approved" ? "text-green-600" :
                  "text-red-600"
                }`}>
                  {selectedApp.status}
                </span>
              </div>
              {selectedApp.feedback && (
                <div className="pt-2 mt-2 border-t">
                  <p className="font-medium">Feedback:</p>
                  <p className="mt-1 bg-gray-50 p-2 rounded text-gray-700">
                    {selectedApp.feedback}
                  </p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => {
                setSelectedApp(null);
                setDetailsModal(false);
              }}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {selectedApp && feedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleFeedbackSubmit}
            className="bg-white w-full max-w-md rounded-lg p-5 shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Provide Feedback
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  setFeedback("");
                  setFeedbackModal(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded p-2 resize-none min-h-[120px] text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write feedback here (e.g., missing documents)..."
              required
            />
            
            <div className="flex justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedApp(null);
                  setFeedback("");
                  setFeedbackModal(false);
                }}
                className="w-1/2 bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManagedAppliedScholarships;