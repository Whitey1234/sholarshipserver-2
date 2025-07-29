import React from 'react';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-4">
      <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
      <p className="text-base-content/70 mb-6">
        The page you're looking for might have been removed,<br /> had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="btn btn-primary gap-2 rounded-full px-6 shadow-md hover:scale-105 transition-transform duration-200"
      >
        <FaArrowLeft /> Go Home
      </Link>

      <div className="mt-10 opacity-50">
        <img
          src="https://i.ibb.co/r5krrdz/ghost.png"
          alt="ghost illustration"
          className="w-60 mx-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
