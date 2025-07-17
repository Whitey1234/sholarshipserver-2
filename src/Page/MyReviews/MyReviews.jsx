import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axiosSecure.get('/get-reviews');
      const myReviews = res.data.filter((review) => review.userEmail === user.email);
      setReviews(myReviews);
    };
    fetchReviews();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        setReviews(prev => prev.filter(r => r._id !== id));
        toast.success('Review deleted successfully!');
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedReview = {
      comment: form.comment.value,
      rating: parseInt(form.rating.value),
    };

    const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, updatedReview);

    if (res.data.modifiedCount > 0) {
      Swal.fire('Updated!', 'Your review has been updated.', 'success');
      setEditingReview(null);

      const updated = await axiosSecure.get('/get-reviews');
      const myReviews = updated.data.filter((r) => r.userEmail === user.email);
      setReviews(myReviews);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Scholarship Reviews</h2>

      {reviews.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-lg text-center text-gray-500">
          No reviews found. Add a review from your applications.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Scholarship</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{review.scholarshipName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{review.universityName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 italic">"{review.comment}"</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setEditingReview(review)}
                      className="text-yellow-600 hover:text-yellow-800 mr-3"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow w-full max-w-md"
          >
            <h3 className="text-lg font-semibold mb-4">Edit Your Review</h3>
            <label className="block mb-2 text-sm font-medium">Comment</label>
            <textarea
              name="comment"
              defaultValue={editingReview.comment}
              className="w-full p-2 border rounded mb-4"
              required
            ></textarea>
            <label className="block mb-2 text-sm font-medium">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              defaultValue={editingReview.rating}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default MyReviews;
