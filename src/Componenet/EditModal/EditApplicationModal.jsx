// EditApplicationModal.jsx
import React, { useState } from 'react';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const EditApplicationModal = ({ open, onClose, application, setApplications }) => {
  const [degree, setDegree] = useState(application?.degree || '');
  const [studyGap, setStudyGap] = useState(application?.studyGap || '');

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedApp = {
      degree,
      studyGap,
    };

    const res = await axiosSecure.patch(`/applied-scholarships/${application._id}`, updatedApp);
    if (res.data.modifiedCount > 0) {
      toast.success('Application updated successfully!');
      setApplications(prev => prev.map(app => 
        app._id === application._id ? { ...app, ...updatedApp } : app
      ));
      onClose();
    }
  };

  if (!open || !application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Application</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="select select-bordered w-full"
          >
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
          <select
            value={studyGap}
            onChange={(e) => setStudyGap(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Study Gap</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3+ Years</option>
          </select>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;
