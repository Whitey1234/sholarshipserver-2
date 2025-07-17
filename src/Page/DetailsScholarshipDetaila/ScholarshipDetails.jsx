import React, { use } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';
import { 
  FaUniversity, 
  FaBook, 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaCreditCard,
  FaTools,
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaGlobeAmericas,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';

const ScholarshipDetails = () => {
  const {userRole} = use(AuthContext)
  
//console.log(user.displayName)
  const loaderData = useLoaderData();
  const { id } = useParams();
  const scholarship = loaderData.find((item) => item._id === id);

  if (!scholarship) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Scholarship Not Found</h3>
          <p className="text-gray-600">The requested scholarship does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const {
    universityName,
    universityLogo,
    scholarshipCategory,
    subjectCategory,
    degree,
    worldRank,
    tuitionFees,
    applicationFees,
    serviceCharge,
    location,
    deadline,
    postDate,
    createdByUser,
    createdBy,
    rating = 0,
    _id
  } = scholarship;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white p-2 rounded-full">
              <img 
                src={universityLogo} 
                alt={`${universityName} Logo`} 
                className="w-20 h-20 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{universityName}</h1>
              <div className="flex items-center mt-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>{location?.city}, {location?.country}</span>
              </div>
              <div className="flex items-center mt-1">
                <FaGlobeAmericas className="mr-2" />
                <span>World Rank: {worldRank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <DetailItem 
                icon={<FaUniversity className="text-blue-600" />}
                label="Scholarship Category"
                value={scholarshipCategory}
              />
              <DetailItem 
                icon={<FaBook className="text-blue-600" />}
                label="Subject Category"
                value={subjectCategory}
              />
              <DetailItem 
                icon={<FaGraduationCap className="text-blue-600" />}
                label="Degree"
                value={degree}
              />
              <DetailItem 
                icon={<FaMoneyBillWave className="text-blue-600" />}
                label="Tuition Fees"
                value={tuitionFees}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <DetailItem 
                icon={<FaCreditCard className="text-blue-600" />}
                label="Application Fees"
                value={`$${applicationFees}`}
              />
              <DetailItem 
                icon={<FaTools className="text-blue-600" />}
                label="Service Charge"
                value={`$${serviceCharge}`}
              />
              <DetailItem 
                icon={<FaCalendarAlt className="text-blue-600" />}
                label="Deadline"
                value={deadline}
              />
              {
                userRole == 'admin'? <DetailItem 
                icon={<FaUser className="text-blue-600" />}
                label="Posted By"
                value={createdBy}
              /> : ""
              }
              <DetailItem 
                icon={<FaUser className="text-blue-600" />}
                label="Posted By"
                value={createdByUser}
              /> 
              
              <DetailItem 
                icon={<FaStar className="text-blue-600" />}
                label="Rating"
                value={`${rating}/5`}
              />
            </div>
          </div>

          {/* Dates Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Important Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="font-medium">{formatDate(postDate)}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Application Deadline</p>
                <p className="font-medium">{deadline}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <Link to={`/apply/${_id}`}>
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              Apply for Scholarship
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="mr-4 mt-1">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default ScholarshipDetails;