import { AspectRatio } from "../ui/aspect-ratio";

const AboutUsSection = () => {
  return (
    <section className="py-32 bg-white  min-h-screen flex items-center">
      <div className="   2xl:min-w-7xl 2xl:max-w-9/12 xl:max-w-6xl lg:max-w-5xl md:max-w-2xl max-w-xl px-4  mx-auto mb-32 ">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="mb-6">
              <div className="text-sm tracking-[3px] text-[#C19D60] uppercase mb-2">
                
              </div>
              <h2 className="text-4xl font-serif text-[#C19D60] tracking-[3px] ">Volto Restaurant </h2>
            </div>
            <p className="mx-auto text-justify leading-relaxed max-w-6xl mt-4 mb-8 font-[Times_New_Roman] text-[#4a4949] text-base sm:text-lg md:text-xl">
              Volto Bahrain is more than a restaurant – it is an experience. With world-class
              design, an electric atmosphere, and a fusion of fine dining and music, Volto has
              quickly become a landmark destination in the Kingdom of Bahrain.
            </p>
            <p className="mx-auto text-justify leading-relaxed max-w-6xl mt-4 mb-8 font-[Times_New_Roman] text-[#4a4949] text-base sm:text-lg md:text-xl">
              Our team of award-winning chefs, mixologists, and performers craft unforgettable
              nights. From signature cocktails to live DJ sets, every detail at Volto is designed to
              deliver luxury, style, and energy.
            </p>
          </div>

          {/* Right Column - Images */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-8 items-start">
            <AspectRatio ratio={3 / 4} className="bg-muted rounded-none  h-full mt-24">
              <img
                src="img/about/volto-outside.webp"
                alt="About 2"
                className=" h-full w-full rounded-none object-cover"
              />
            </AspectRatio>

            <AspectRatio ratio={3 / 4} className="bg-muted rounded-none">
              <img
                src="img/about/volto-about2.webp"
                alt="About"
                className=" h-full w-full rounded-none object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
