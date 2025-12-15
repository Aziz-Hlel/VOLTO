import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-black via-[#1c1b18] to-[#6b5b2a] backdrop-blur-sm text-gray-300 py-16 px-6 md:px-20 order-t border-yellow-600/20">
      {/* --- Logo Centré --- */}

      {/* --- Contenu principal du footer --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 text-center md:text-left">
        <div className="flex justify-center ">
          <img
            src="/logo.png"
            alt="Techno Shark Logo"
            className="h-24 sm:h-24 md:h-38 w-auto brightness-110   duration-1000 object-contain animate-pulse transition-all"
          />
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
            <li className=" space-x-2">
              <span className="font-semibold text-gray-300">Email:</span>
              <a href="mailto:voltobahrain@gmail.com">voltobahrain@gmail.com</a>
            </li>
            <li className=" space-x-2">
              <span className="font-semibold text-gray-300">CR no :</span>
              <span>142116-2</span>
            </li>
          </ul>
        </div>

        {/* --- Newsletter --- */}
      </div>

      {/* --- Footer Bottom --- */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-3 text-center">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            className="bg-gradient-to-r from-[#c5a100] via-[#e0b84a] to-[#f5d67b] bg-clip-text text-transparent font-semibold hover:underline underline"
            href="https://technoshark.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Techno Shark
          </a>
          . All rights reserved.
        </p>

        <div className="flex gap-6">
          {/* <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white transition-colors">
            Terms
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
