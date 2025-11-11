import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const OpeningHours = () => {
  return (
    <section
      className="bg-fixed bg-cover bg-center py-28 md:py-60 min-h-screen"
      style={{ backgroundImage: "url('img/banner5.jpg')" }}
    >
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-12">
          {/* Opening Hours */}
          <div className="bg-white/95 backdrop-blur-md px-6 py-12 md:px-12 md:py-20 shadow-2xl rounded-2xl w-full md:w-1/2 flex flex-col items-center">
            <h4 className="text-4xl md:text-4xl font-serif text-[#1b1b1b] mb-10 pb-5 text-center border-b border-[#C19D60]/30 w-full md:w-4/6">
              Opening Hours
            </h4>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              {/* Sunday to Tuesday */}

              {/* Friday to Saturday */}
              <div className="text-center">
                <h6 className="text-sm md:text-2xl font-semibold text-[#1b1b1b] uppercase mb-3">
                  Everyday
                </h6>
                <div className="space-y-1 space-x-1 text-[#777] text-lg">
                  <span>7:00 PM</span>
                  <span>-</span>
                  <span>3:00 AM</span>
                </div>
              </div>
            </div>

            <Link
              to="/reservation"
              className="mt-8 inline-block w-fit bg-[#C19D60] text-white uppercase tracking-wide text-sm md:text-base py-3 px-8 rounded-lg shadow-lg hover:bg-[#b98f50] transition-colors duration-300"
            >
              Make A Reservation
            </Link>

            <p className="text-sm md:text-base text-[#777] mt-5 text-center">
              You can also call:{" "}
              <a href="tel:+97334588466" className="text-[#C19D60] underline"></a> to make a
              reservation.
            </p>

            <p className="text-sm md:text-base text-[#777] flex items-center justify-center gap-2 mt-3 text-center">
              <MapPin className="text-[#C19D60] h-5 w-5" />
              <span>Shop 2, Building، 436 Road 3815, Manama, Bahrain</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
