import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-black via-gray-900 to-yellow-600 px-4 text-center">
      {/* 404 */}
      <h1 className="text-9xl font-extrabold text-yellow-400 animate-bounce drop-shadow-lg">404</h1>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 drop-shadow-md">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-white/80 mt-2 max-w-md mx-auto">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      {/* Button */}
      <Link to="/">
        <button className="mt-6 px-8 py-3 cursor-pointer bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:scale-105 duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
