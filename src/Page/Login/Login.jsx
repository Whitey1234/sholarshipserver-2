import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
// 
import Lottie from "lottie-react";
// import lottieLogin from "../../../Animation - 1749217664991.json"; // Replace with your file
import { AuthContext } from "../../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login, gLogin } = useContext(AuthContext);
  const [firebaseError, setFirebaseError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFirebaseError("");
    const { email, password } = data;

    login(email, password)
      .then(() => {
        navigate(redirectPath);
      })
      .catch((err) => {
        setFirebaseError(err.message);
      });
  };

  const handleGoogleLogin = () => {
    gLogin()
      .then((result) => {
        console.log("Google login:", result.user);
        navigate(redirectPath);
      })
      .catch((err) => {
        setFirebaseError(err.message);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500">Password is required</p>}
          </div>

          {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
             <FaGoogle/> Login with Google
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="link link-primary font-medium">
            Register here
          </a>
        </p>
      </div>

      {/* <div className="hidden lg:block">
        <Lottie animationData={lottieLogin} loop={true} style={{ width: "400px" }} />
      </div> */}
    </div>
  );
};

export default Login;
