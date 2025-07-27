import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import AddReviewModal from '../../Componenet/review/AddReviewModal';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { FiEdit2, FiTrash2, FiEye, FiStar } from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EditApplicationModal from '../../Componenet/EditModal/EditApplicationModal';
import Feedback from '../FeedbackApplication/Feedback';

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
const [editingApp, setEditingApp] = useState(null);
const [detailsApp, setDetailsApp] = useState(null);

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const res = await axiosSecure.get('/get-applied-scholarships');
        const myApps = res.data.filter(app => app.userEmail === user.email);
        setApplications(myApps);
      } catch (err) {
        toast.error('Failed to load applications');
      }
    };
    fetchMyApplications();
  }, [user.email]);

 const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    });
  console.log(id)
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/applied-scholarships/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('Application canceled successfully!');
          setApplications(prev => prev.filter(app => app._id !== id));
        }
      } catch (error) {
        toast.error('Failed to cancel application');
      }
    }
  };

  const handleViewDetails = (app) => {
  setDetailsApp(app);
  document.getElementById('details_modal').showModal();
};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <FaUniversity className="text-3xl text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">My Scholarship Applications</h2>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaUniversity className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No applications yet</h3>
          <p className="text-gray-500 mb-4">You haven't applied for any scholarships</p>
          <Link 
            to="/scholarships" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUniversity className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.universityName}</div>
                          <div className="text-sm text-gray-500">{app.universityCity}, {app.universityCountry}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{app.subjectCategory}</div>
                      <div className="text-sm text-gray-500">{app.degree}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${app.applicationFees}</div>
                      <div className="text-xs text-gray-500">+ ${app.serviceCharge} service</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        app.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                         <button
  onClick={() => handleViewDetails(app)}
  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
  title="View Details"
>
  <FiEye className="h-5 w-5" />
</button>
                         <button
                                onClick={() => {
                                  setEditingApp(app);
                                  setEditModalOpen(true);
                                }}
                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FiEdit2 className="h-5 w-5" />
                              </button>
                        <button 
                          onClick={() => handleCancel(app._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          title="Cancel"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedScholarship(app);
                            setIsModalOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                          title="Add Review"
                        >
                          <FiStar className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUniversity className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{app.universityName}</h3>
                        <p className="text-sm text-gray-500">{app.universityCity}, {app.universityCountry}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : app.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : app.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {app.status || 'pending'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Program</p>
                      <p className="text-sm font-medium">{app.subjectCategory}</p>
                      <p className="text-xs text-gray-500">{app.degree}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Fees</p>
                      <p className="text-sm font-medium">${app.applicationFees}</p>
                      <p className="text-xs text-gray-500">+ ${app.serviceCharge} service</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center border-t pt-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase">Feedback</p>
                      <p className="text-sm">{app.feedback || 'Not provided'}</p>
                    </div>
                    <div className="flex space-x-2">
                     <button
  onClick={() => handleViewDetails(app)}
  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
  title="View Details"
>
  <FiEye className="h-5 w-5" />
</button>
                            <button
                                onClick={() => {
                                  setEditingApp(app);
                                  setEditModalOpen(true);
                                }}
                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                                title="Edit"
                              >
                                <FiEdit2 className="h-5 w-5" />
                              </button>

                      <button 
                        onClick={() => handleCancel(app._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Cancel"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedScholarship(app);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        title="Add Review"
                      >
                        <FiStar className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddReviewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scholarship={selectedScholarship}
        user={user}
      />
      <EditApplicationModal
  open={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  application={editingApp}
  setApplications={setApplications}
/>
      <ToastContainer/>
      <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-xl text-blue-600 mb-4">
      {detailsApp?.universityName}
    </h3>

    <div className="space-y-2 text-sm text-gray-700">
      <p><strong>Subject Category:</strong> {detailsApp?.subjectCategory}</p>
      <p><strong>Degree:</strong> {detailsApp?.degree}</p>
      <p><strong>University Location:</strong> {detailsApp?.universityCity}, {detailsApp?.universityCountry}</p>
      <p><strong>Fees:</strong> ${detailsApp?.applicationFees} + ${detailsApp?.serviceCharge} Service</p>
      <p><strong>Status:</strong> {detailsApp?.status}</p>
      <p><strong>Feedback:</strong> {detailsApp?.feedback || 'No feedback yet'}</p>
    </div>

    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
 {/* feedbacck  */}
  <Feedback/>
    </div>
  );
};

export default MyApplications;