import React from "react";
import { Skiper48 } from "./Skiper48";
import { Link } from "react-router-dom";

const CocktailSwiper = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Skiper48 />
      <button
        className="absolute bottom-0 lg:bottom-8 right-16 m-4 bg-[#D4AF37] px-6 py-3 text-black font-semibold hover:bg-yellow-500 transition-color rounded-full"
      >
        <Link to="all">View the full menu</Link>
      </button>
    </div>
  );
};

export default CocktailSwiper;
