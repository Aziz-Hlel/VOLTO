import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const OpeningHours = () => {
  return (
    <>
      <section
        className="bg-fixed bg-cover bg-center py-28 md:py-60  min-h-screen"
        style={{ backgroundImage: "url('img/banner5.jpg')" }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="md:flex md:items-center md:justify-center ">
            {/* Opening Hours */}
            <div className="md:w-1/2 mt-12 md:mt-0 md:ml-12">
              <div className="bg-white px-4 py-8 md:px-12 md:py-24 shadow-lg rounded w-full flex flex-col justify-center items-center ">
                <h4 className="text-4xl font-serif w-full  md:w-4/6 text-[#1b1b1b] mb-8 pb-5 text-center border-b border-[#C19D60]/15 ">
                  Opening Hours
                </h4>

                <div className=" flex items-start ">
                  {/* Sunday to Tuesday */}
                  <div className=" text-center ">
                    <h6 className="text-sm font-semibold text-[#1b1b1b] uppercase mb-5">
                      Sunday to Tuesday
                    </h6>
                    <div className=" space-y-1">
                      <span className="block  text-[#777]">10:00</span>
                      <span className="block  text-[#777]">22:00</span>
                    </div>
                  </div>

                  {/* Vertical Line */}
                  <div className="flex justify-center pt-7 w-20">
                    <div className="h-16 border-l border-[#C19D60] transform translate-x-1/2"></div>
                  </div>

                  {/* Friday to Saturday */}
                  <div className=" text-center ">
                    <h6 className="text-sm font-semibold text-[#1b1b1b] uppercase mb-5">
                      Friday to Saturday
                    </h6>
                    <div className=" space-y-1">
                      <span className="block  text-[#777]">12:00</span>
                      <span className="block  text-[#777]">19:00</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-block w-fit bg-[#C19D60] text-white uppercase tracking-wider text-sm py-4 mt-8 px-8 rounded-sm mb-4"
                >
                  Make A Reservation
                </Link>

                <p className="text-sm text-[#777] mb-2 mt-5 text-center">
                  You can also call:{" "}
                  <a href="mailto:8551004444" className="text-[#C19D60] underline">
                    855 100 4444
                  </a>{" "}
                  to make a reservation.
                </p>

                <p className="text-sm text-[#777] flex   mt-0 text-center">
                  <MapPin className=" text-[#C19D60] h-4" />
                  <small>1616 Broadway NY, New York 10001 USA</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OpeningHours;
