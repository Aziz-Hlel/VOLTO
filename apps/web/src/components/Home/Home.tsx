import AboutUsSection from "../About/AboutUsSection";
import { EventCarousel } from "./EventCarousel";
import OpeningHours from "./OpeningHours";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <video
          className="w-screen h-screen object-cover"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline
        >
          <source src="/landingVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* <WineBanner /> */}  
      <AboutUsSection />
      {/* <ChefRecommendation /> */}
      <OpeningHours />
      {/* <Menu /> */}
      {/* <MeetTeam /> */}
      <EventCarousel />
      <Footer />
    </>
  );
};

export default Home;
