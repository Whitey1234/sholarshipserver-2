
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, gLogin } = useContext(AuthContext);

  const onSubmit = (data) => {
    const { name, photo, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        // Set user role
        const userRole = "user"; // Default role

        // You can implement logic to determine the role, for example, the first user is an admin
        // For simplicity, we'll default to "user" and you can add your logic here.

        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            // Save user info to your database with the role
            saveUserToDB(user, userRole);
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const handleGoogleSignUp = () => {
    gLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Save user info to your database with the role
        saveUserToDB(user, "user");
      })
      .catch((error) => {
        console.error("Error with Google sign-in:", error);
      });
  };

  const saveUserToDB = (user, role) => {
    const userData = {
      email: user.email,
      name: user.displayName,
      role: role,
    };
    // Here you would typically make an API call to your backend to save the user data
    console.log("Saving user to database:", userData);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photo", { required: true })}
                placeholder="photo url"
                className="input input-bordered"
              />
              {errors.photo && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="form-control mt-6">
            <button
              onClick={handleGoogleSignUp}
              className="btn btn-secondary"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
