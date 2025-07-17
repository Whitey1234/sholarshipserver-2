import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import axiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const ApplyScholarship = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: '',
    photo: '',
    address: '',
    gender: '',
    degree: '',
    ssc: '',
    hsc: '',
    studyGap: 'No'
  });

  // Calculate total fees
  const totalFees = Number(data.applicationFees) + Number(data.serviceCharge);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login to apply for scholarships");
    }

    const application = {
      ...formData,
      universityName: data.universityName,
      scholarshipCategory: data.scholarshipCategory,
      subjectCategory: data.subjectCategory,
      userName: user.displayName,
      userEmail: user.email,
      userId: user?.uid || 'N/A',
      scholarshipId: data._id,
      applicationFees: data.applicationFees,
      serviceCharge: data.serviceCharge,
      totalFees: totalFees,
      status: 'pending',
      appliedAt: new Date()
    };

    try {
      const res = await axiosSecure.post('/applied-scholarships', application);
      if (res.data.insertedId) {
        toast.success("Application prepared successfully!");
        navigate(`/payment/${data._id}`, { 
          state: { 
            applicationId: res.data.insertedId,
            amount: totalFees,
            scholarshipName: data.universityName
          } 
        });
      }
    } catch (err) {
      toast.error("Failed to apply. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Apply for {data.universityName}</h2>
          <p className="mt-2">{data.scholarshipCategory} - {data.subjectCategory}</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Fees Summary Card */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Fees Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Application Fee:</span>
                  <span className="font-medium">${data.applicationFees}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Charge:</span>
                  <span className="font-medium">${data.serviceCharge}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-blue-600">
                  <span>Total Amount:</span>
                  <span>${totalFees}</span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                </div>
                
                <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="input input-bordered" />
                <input name="photo" placeholder="Photo URL" onChange={handleChange} required className="input input-bordered" />
                <input name="address" placeholder="Village, District, Country" onChange={handleChange} required className="input input-bordered" />

                <select name="gender" onChange={handleChange} required className="select select-bordered">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Academic Information</h3>
                </div>

                <select name="degree" onChange={handleChange} required className="select select-bordered">
                  <option value="">Applying Degree</option>
                  <option>Diploma</option>
                  <option>Bachelor</option>
                  <option>Masters</option>
                </select>

                <input name="ssc" type="number" step="0.01" placeholder="SSC GPA (e.g. 5.00)" onChange={handleChange} required className="input input-bordered" />
                <input name="hsc" type="number" step="0.01" placeholder="HSC GPA (e.g. 5.00)" onChange={handleChange} required className="input input-bordered" />

                <select name="studyGap" onChange={handleChange} className="select select-bordered">
                  <option>No Study Gap</option>
                  <option>1 Year</option>
                  <option>2+ Years</option>
                </select>

                <div className="md:col-span-2 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full py-3 text-lg"
                  >
                    Proceed to Payment (${totalFees})
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
            <ul className="list-disc pl-5 text-yellow-700 space-y-1">
              <li>Application fee is non-refundable</li>
              <li>You will be redirected to payment gateway after form submission</li>
              <li>Ensure all information is accurate before submission</li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ApplyScholarship;