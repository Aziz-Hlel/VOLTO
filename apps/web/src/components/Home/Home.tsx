import { Link } from "react-router-dom";
import AboutUsSection from "../About/AboutUsSection";
import MeetTeam from "../About/MeetTeam";
import ChefRecommendation from "./ChefRecommendation";
import { EventCarousel } from "./EventCarousel";
import MeetOurChefs from "./MeetOurChefs";
import OpeningHours from "./OpeningHours";
import WineBanner from "./WineBanner";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <video
          className="w-screen h-screen object-cover"
          poster="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          autoPlay
          loop
          muted
        >
          <source src="/landingVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* <WineBanner /> */}
      <AboutUsSection />
      <ChefRecommendation />
      <OpeningHours />
      {/* <Menu /> */}
      <MeetTeam />
      <EventCarousel />
      <Footer />
    </>
  );
};

export default Home;
