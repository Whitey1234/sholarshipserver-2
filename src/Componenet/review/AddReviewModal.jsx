import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosSecure from '../../Hooks/useAxiosSecure';


const AddReviewModal = ({ open, onClose, scholarship, user }) => {
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      ...formData,
      scholarshipName: scholarship.subjectCategory || 'N/A',
      universityName: scholarship.universityName,
      universityScholarshipCategory : scholarship.scholarshipCategory,
      universityId: scholarship.scholarshipId || scholarship._id,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL || '',
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        toast.success('Review submitted successfully!');
        onClose(); // Close modal
      }
    } catch (error) {
      toast.error('Failed to submit review.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add Your Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            required
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <textarea
            name="comment"
            placeholder="Write your review"
            required
            className="textarea textarea-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            required
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
