import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import axiosSecure from "../../Hooks/useAxiosSecure";


const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  

  useEffect(() => {
    axiosSecure.get("/get-reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
 console.log(reviews)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Review has been deleted.", "success");
        setReviews((prev) => prev.filter((review) => review._id !== id));
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{review.universityName}</h3>
              <p className="text-sm text-gray-500 mb-2">{review.subjectCategory}</p>
              <div className="flex items-center mb-2">
                <img
                  src={review.userImage}
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium">{review.reviewerName}</p>
                  <p className="text-xs text-gray-500">{review.reviewDate}</p>
                </div>
              </div>
              <p className="text-yellow-500 mb-2">Rating: {review.rating} ★</p>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-4 px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
