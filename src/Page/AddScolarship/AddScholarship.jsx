import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import axiosSecure from '../../Hooks/useAxiosSecure';

const AddScholarship = () => {
  const navigate = useNavigate();
  const { user, userRole } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    setUploading(true);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Image upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== 'admin' && userRole !== 'moderator') {
      setMessage('Access Denied');
      return;
    }

    const form = e.target;

    const newScholarship = {
      universityName: form.universityName.value,
      universityLogo: imageUrl,
      scholarshipCategory: form.scholarshipCategory.value,
      subjectCategory: form.subjectCategory.value,
      degree: form.degree.value,
      location: {
        country: form.country.value,
        city: form.city.value,
      },
      worldRank: form.worldRank.value,
      tuitionFees: form.tuitionFees.value || 'N/A',
      applicationFees: parseFloat(form.applicationFees.value),
      serviceCharge: parseFloat(form.serviceCharge.value),
      deadline: form.deadline.value,
      postDate: new Date(),
      rating: 0,
      createdByUser :form.create.value,
      createdBy: user.email,
      createdAt: new Date()
      
    };

    try {
      const res = await axiosSecure.post('/scholarships', newScholarship);
      if (res.data.insertedId) {
        toast.success('Scholarship added successfully!');
        form.reset();
        setImageUrl('');
        navigate('/all-scholarship');
      }
    } catch (err) {
      toast.error('Error submitting form',err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 shadow border rounded">
      <h2 className="text-2xl font-bold mb-4">Add Scholarship</h2>
      {message && <p className="text-red-600">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="universityName" placeholder="University Name" className="input input-bordered" required />
        <input name="worldRank" type="number" placeholder="University World Rank" className="input input-bordered" required />

        {/* Image Upload */}
        <div className="md:col-span-2">
          <input type="file" onChange={handleImageUpload} className="file-input w-full" required />
          {uploading && <p className="text-blue-600">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="w-24 h-24 mt-2 rounded" />}
        </div>

        <select name="subjectCategory" className="select select-bordered" required>
          <option value="">Select Subject Category</option>
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>

        <select name="scholarshipCategory" className="select select-bordered" required>
          <option value="">Select Scholarship Category</option>
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select name="degree" className="select select-bordered" required>
          <option value="">Select Degree</option>
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input name="country" placeholder="Country" className="input input-bordered" required />
        <input name="city" placeholder="City" className="input input-bordered" required />
        <input name="tuitionFees" type="number" placeholder="Tuition Fees (Optional)" className="input input-bordered" />
        <input name="applicationFees" type="number" placeholder="Application Fees" className="input input-bordered" required />
        <input name="serviceCharge" type="number" placeholder="Service Charge" className="input input-bordered" required />
        <input name="deadline" type="date" className="input input-bordered" required />
       <input name="create" type="text" defaultValue={user.displayName} className="input input-bordered" disabled required />


        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
            Add Scholarship
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AddScholarship;
