import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 px-4 text-center">

      {/* Animated 404 */}
      <svg
        className="w-64 md:w-96 h-64 md:h-96"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle */}
        <circle
          cx="256"
          cy="256"
          r="200"
          stroke="#D8BFAF"  // couleur douce
          strokeWidth="12"
        >
          <animate
            attributeName="r"
            values="190;210;190"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Cross inside circle */}
        <line
          x1="160"
          y1="192"
          x2="352"
          y2="320"
          stroke="#D8BFAF" // couleur douce
          strokeWidth="20"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 256 256"
            to="360 256 256"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>
        <line
          x1="352"
          y1="192"
          x2="160"
          y2="320"
          stroke="#D8BFAF" // couleur douce
          strokeWidth="20"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 256 256"
            to="-360 256 256"
            dur="6s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-6 drop-shadow-sm">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-600 mt-2 max-w-md mx-auto">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      {/* Button */}
      <Link to="/">
        <button className="mt-6 px-8 py-3 bg-[#D8BFAF] text-gray-800 font-semibold rounded-full shadow-md hover:bg-[#CBB9A3] transition transform hover:scale-105 duration-300">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;