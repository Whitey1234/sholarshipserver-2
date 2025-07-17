import React, { useEffect, useState } from 'react';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const AllScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosSecure('/scholarships');
        setScholarships(res.data);
        setFiltered(res.data); // Initially show all
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };
    fetchScholarships();
  }, []);

  const handleSearch = () => {
    const query = searchText.toLowerCase();
    const result = scholarships.filter((sch) =>
      sch.universityName.toLowerCase().includes(query) ||
      sch.scholarshipCategory.toLowerCase().includes(query) ||
      sch.subjectCategory.toLowerCase().includes(query)
    );
    setFiltered(result);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 🔍 Search Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by University, Scholarship, or Degree"
          className="input input-primary input-bordered w-full md:w-[200px]"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 🎓 Scholarship Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.length === 0 ? (
          <p className="text-center text-red-500 col-span-full">
            No matching scholarships found.
          </p>
        ) : (
          currentItems.map((item) => (
            <div key={item._id} className="card shadow-lg border p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={item.universityLogo}
                  alt="logo"
                  className="w-14 h-14 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">{item.universityName}</h3>
                  <p className="text-sm text-gray-500">
                    {item.location.city}, {item.location.country}
                  </p>
                </div>
              </div>
              <p><strong>Category:</strong> {item.scholarshipCategory}</p>
              <p><strong>Subject:</strong> {item.subjectCategory}</p>
              <p><strong>Fees:</strong> ${item.applicationFees}</p>
              <p><strong>Deadline:</strong> {item.deadline}</p>
              <p><strong>Rating:</strong> {item.rating || 0}</p>
              <div className="mt-4">
                <Link to={`/scolarship-details/${item._id}`}>
                 <button className="btn btn-primary   hover:bg-blue-700 btn-outline w-full">View Details</button>
                </Link>
               
              </div>
            </div>
          ))
        )}
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarship;
