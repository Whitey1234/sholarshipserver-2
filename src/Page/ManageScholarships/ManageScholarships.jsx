import React, { useActionState, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosSecure from '../../Hooks/useAxiosSecure';

const MySwal = withReactContent(Swal);

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axiosSecure.get('/scholarships')
      .then(res => setScholarships(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDetails = (item) => {
    MySwal.fire({
      title: `<strong>${item.universityName}</strong>`,
      html: `
        <div style="text-align: left;">
          <p><b>Scholarship:</b> ${item.scholarshipCategory || 'N/A'}</p>
          <p><b>Subject:</b> ${item.subjectCategory || 'N/A'}</p>
          <p><b>Degree:</b> ${item.degree || 'N/A'}</p>
          <p><b>Application Fees:</b> ${item.applicationFees} TK</p>
          <p><b>Service Charge:</b> ${item.serviceCharge || 'N/A'} TK</p>
          <p><b>World Rank:</b> ${item.worldRank || 'N/A'}</p>
          <p><b>Location:</b> ${item.location?.city || ''}, ${item.location?.country || ''}</p>
        </div>
      `,
      imageUrl: item.universityLogo,
      imageWidth: 80,
      imageHeight: 80,
      confirmButtonText: 'Close'
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This scholarship will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      axios.delete(`https://student-scholarship-ass-12.vercel.app/scholarships/${id}`)
        .then(() => {
          setScholarships(prev => prev.filter(item => item._id !== id));
          Swal.fire('Deleted!', 'Scholarship has been deleted.', 'success');
        });
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      scholarshipCategory: form.scholarshipCategory.value,
      subjectCategory: form.subjectCategory.value,
      degree: form.degree.value,
      applicationFees: form.applicationFees.value,
      serviceCharge: form.serviceCharge.value
    };

    axios.patch(`https://student-scholarship-ass-12.vercel.app/scholarships/${editData._id}`, updated)
      .then(() => {
        Swal.fire('Updated!', 'Scholarship updated successfully.', 'success');
        form.reset();
        setEditData(null);
        axios.get('https://student-scholarship-ass-12.vercel.app/scholarships')
          .then(res => setScholarships(res.data));
      });
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">Manage Scholarships</h2>
      
      {/* Mobile Cards View */}
      <div className="sm:hidden space-y-4">
        {scholarships.map(item => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.universityName}</h3>
                <p className="text-sm text-gray-600">{item.scholarshipCategory}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDetails(item)} className="text-blue-600 p-1">
                  <FiEye size={18} />
                </button>
                <button onClick={() => handleEdit(item)} className="text-green-600 p-1">
                  <FiEdit size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-red-600 p-1">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Subject:</span> {item.subjectCategory}
              </div>
              <div>
                <span className="text-gray-500">Degree:</span> {item.degree}
              </div>
              <div>
                <span className="text-gray-500">Fees:</span> {item.applicationFees} TK
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scholarship
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Degree
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fees
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scholarships.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.scholarshipCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.universityName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.subjectCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.degree}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.applicationFees} TK
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <div className="flex justify-center space-x-3">
                    <button onClick={() => handleDetails(item)} className="text-blue-600 hover:text-blue-900">
                      <FiEye size={18} />
                    </button>
                    <button onClick={() => handleEdit(item)} className="text-green-600 hover:text-green-900">
                      <FiEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal - Responsive */}
      {editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Edit Scholarship</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Category</label>
                <input
                  type="text"
                  name="scholarshipCategory"
                  defaultValue={editData.scholarshipCategory}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject Category</label>
                <input
                  type="text"
                  name="subjectCategory"
                  defaultValue={editData.subjectCategory}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  name="degree"
                  defaultValue={editData.degree}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Fees</label>
                <input
                  type="number"
                  name="applicationFees"
                  defaultValue={editData.applicationFees}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Charge</label>
                <input
                  type="number"
                  name="serviceCharge"
                  defaultValue={editData.serviceCharge}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditData(null)}
                className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;