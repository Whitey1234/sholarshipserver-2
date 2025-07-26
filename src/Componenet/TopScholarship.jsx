import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import {
  FaUniversity,
  FaMoneyBillWave,
  FaRegClock,
  FaCalendarAlt,
} from "react-icons/fa";
import axiosSecure from "../Hooks/useAxiosSecure";

const TopScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure.get("/scholarships");
        const sorted = res.data
          .sort((a, b) => {
            const feeDiff =
              parseFloat(a.applicationFee) - parseFloat(b.applicationFee);
            if (feeDiff !== 0) return feeDiff;
            return new Date(b.postDate) - new Date(a.postDate);
          })
          .slice(0, 6);
        setScholarships(sorted);
      } catch (error) {
        console.error("Failed to fetch scholarships", error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Top Scholarships</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <img
              src={scholarship.universityLogo}
              alt={scholarship.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-xl font-semibold mb-1">{scholarship.name}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <FaUniversity className="text-blue-600" />
              {scholarship.universityName}
            </p>
            <p className="text-sm flex items-center gap-1 mt-1">
              <FaMoneyBillWave className="text-green-600" />
              Application Fee: ${scholarship.applicationFees}
            </p>
            <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
              <FaRegClock />
              Deadline: {format(new Date(scholarship.deadline), "dd MMM yyyy")}
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <FaCalendarAlt />
              Posted: {format(new Date(scholarship.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-scholarship")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          View All Scholarships
        </button>
      </div>
    </div>
  );
};

export default TopScholarship;
