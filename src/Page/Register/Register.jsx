// Signup.jsx
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router'; // use 'react-router-dom' if needed
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  
  const axiosSecure = useAxiosSecure()
  const { createUser, updateUser, gLogin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setFirebaseError('');
    const { name, email, password, image } = data;

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      //console.log(user)
       toast.success('Registation sucessfully')

      const imageUrl = await uploadImage(image[0]); // Image upload logic

      await updateUser({ displayName: name, photoURL: imageUrl });

      // Save user info with default role "user"
      const userInfo = {
        name,
        email,
        image: imageUrl,
        role: 'user',
      };
      
        // todo list //

      await axiosSecure.post('/users', userInfo);
      reset();
      navigate('/');
    } catch (err) {
      setFirebaseError(err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await gLogin();
      const user = result.user;
      toast.success('Registation sucessfully')

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: 'user'
      };
        //  google register user rolw send to data base //

      await axiosSecure.post('/users', userInfo);
      navigate('/');
    } catch (err) {
      setFirebaseError(err.message);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    );
    return res.data.data.url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          <div>
            <label className="block font-medium">Photo</label>
            <input type="file" {...register('image', { required: true })} className="file-input w-full" />
            {errors.image && <p className="text-red-500">Photo is required</p>}
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              })}
              className="input input-bordered w-full"
            />
            {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500">Minimum 6 characters</p>}
            {errors.password?.type === 'pattern' && <p className="text-red-500">At least 1 capital and 1 special char</p>}
          </div>

          {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}

          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleRegister} className="btn btn-outline w-full">
          <FaGoogle/> Register with Google
        </button>
        <p className="text-center text-sm mt-4">
         If Already  have an account?{" "}
          <a href="/login" className="link link-primary font-medium">
            login here
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
