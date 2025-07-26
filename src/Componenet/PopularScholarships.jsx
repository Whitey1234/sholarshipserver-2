import React, { useEffect, useState } from 'react';

import { FaMapMarkerAlt, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import axiosSecure from '../Hooks/useAxiosSecure';

const PopularScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get('/scholarships')
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const avgA = average(a.ratings);
          const avgB = average(b.ratings);
          return avgB - avgA;
        });
        setScholarships(sorted.slice(0, 4)); // Only 4 popular
      });
  }, []);

  const average = (arr = []) => {
    if (!arr.length) return 0;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center"> Most Popular Scholarships</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {scholarships.map(item => (
          <div key={item._id} className="border rounded-xl p-4 shadow">
            <div className="flex items-center gap-4 mb-2">
              <img src={item.universityLogo} alt="logo" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-xl font-semibold">{item.universityName}</h3>
                <p className="text-sm text-gray-500">{item.scholarshipCategory}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-500" />
              {item.location.city}, {item.location.country}
            </p>
            <p className="text-sm mt-1">Subject: {item.subjectCategory}</p>
            <p className="text-sm mt-1 flex items-center gap-1">
              <FaMoneyBillWave className="text-green-500" /> ${item.applicationFees}
            </p>
            <p className="text-sm mt-1 text-red-600">
              Deadline: {format(new Date(item.deadline), 'dd MMM yyyy')}
            </p>
            <p className="text-sm mt-1 flex items-center gap-1">
              <FaStar className="text-yellow-500" /> Rating: {average(item.ratings)}
            </p>
            <button
              onClick={() => navigate(`/scolarship-details/${item._id}`)}
              className="mt-3 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Scholarship Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularScholarships;
