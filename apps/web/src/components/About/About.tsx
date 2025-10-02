import NavbarWithScrollTop from "@/NavbarWithScrollTop";
import React from "react";
import AboutUsSection from "./AboutUsSection";
import CeoSection from "./ChefHighlightSection";
import { ArrowDown } from "lucide-react";
import MeetTeam from "./MeetTeam";

const About = () => {
  return (
    <>
      <div
        className="relative bg-fixed bg-cover bg-center min-h-screen h-screen  flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/img/banner-volto.png')" }}
      >
        {/* Optional overlay */}
        <div className="absolute inset-0  bg-opacity-60 bg-black/35" />

        <div className="relative z-10 w-full ">
          <div className="max-w-[1140px] mx-auto px-4">
            <div className="text-center mt-16 flex flex-col md:flex-row items-center justify-center space-x-4">
              {/* <h5 className="text-sm uppercase tracking-[7px] text-white mb-4 font-noah">Restaurant</h5> */}

              <h1 className="text-white text-7xl leading-none font-serif font-normal">
                Behind The
                {/* <span className="block text-[35px] text-[#C19D60] mt-2">Food & Wine</span> */}
              </h1>
              <img src="/logo.png" alt="" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-fit h-fit  rounded-full border  animate-bounce  ">
          <ArrowDown className="text-white w-14 h-14 m-2 " />
        </div>
      </div>

      {/* <NavbarWithScrollTop /> */}
      <AboutUsSection />
      <CeoSection />
      <MeetTeam />
    </>
  );
};

export default About;
