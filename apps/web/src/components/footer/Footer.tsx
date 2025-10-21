import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-black via-[#1c1b18] to-[#6b5b2a] backdrop-blur-sm text-gray-300 py-16 px-6 md:px-20 order-t border-yellow-600/20">
      {/* --- Logo Centré --- */}
      <div className="flex justify-center mb-10">
        <img
          src="/logo.png"
          alt="Techno Shark Logo"
          className="h-16 sm:h-24 md:h-38 w-auto brightness-110 hover:opacity-90 transition-opacity duration-300 object-contain animate-move-horizontal"
        />
      </div>

      {/* --- Contenu principal du footer --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20 text-center md:text-left">
        {/* --- Description --- */}
        <div>
          <p className="text-sm leading-relaxed text-gray-400">
            Techno Shark delivers cutting-edge digital experiences that empower innovation and
            growth for modern businesses.
          </p>
          <div className="flex justify-center md:justify-start items-center gap-4 mt-6">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition-colors text-lg"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition-colors text-lg"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors text-lg"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors text-lg">
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 w-fit mx-auto md:mx-0">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-white transition-colors">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Contact --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 w-fit mx-auto md:mx-0">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <span className="font-semibold text-gray-300">Address:</span> Shop 2, Building، 436
              Road 3815, Manama, Bahrain
            </li>
            <li>
              <span className="font-semibold text-gray-300">Phone:</span>{" "}
              <a href="tel:+97334588466">+973 3458 8466</a>
            </li>
            <li>
              <span className="font-semibold text-gray-300">Email:</span>{" "}
              support@voltobahrain.online
            </li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 w-fit mx-auto md:mx-0">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter and never miss our latest updates.
          </p>

          <Link to="/reservation">
            <button className="cursor-pointer bg-gradient-to-r from-[#c5a100] via-[#e0b84a] to-[#f5d67b] hover:from-[#f5d67b] hover:to-[#c5a100] text-black font-semibold px-5 py-2 rounded-md w-full sm:w-auto transition-all shadow-md hover:shadow-lg">
              Make A Reservation
            </button>
          </Link>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-3 text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-[#c5a100] via-[#e0b84a] to-[#f5d67b] bg-clip-text text-transparent font-semibold">
            Techno Shark
          </span>
          . All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
