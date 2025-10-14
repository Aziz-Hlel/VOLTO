const CeoSection = () => {
  return (
    <section className="py-[120px] bg-[#1b1b1b] text-white">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left Image */}
          <div className="lg:w-1/2">
            <img src="img/about/ceoImg.jpg" alt="Chef" className="w-full" />
          </div>

          {/* Right Text */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <div className="text-sm tracking-[3px] text-[#C19D60] uppercase mb-2">
                10 Year of Experience
              </div>
              <h2 className="text-6xl font-serif text-white">Ceo & Co-Founder</h2>
            </div>
            <p className="text-gray-300  leading-8">
              With decades of passion for entertainment, Volto was born to redefine nightlife. Our
              founder brings vision, creativity, and dedication to every unforgettable night.
            </p>

            {/* Signature Block */}
            <div className="flex items-center gap-4 mt-6">
              <img src="img/signature.svg" alt="Signature" className="h-12" />
              <div>
                <div className="text-lg font-bold text-white">vjmp3</div>
                <div className="text-sm text-[#C19D60]">Multi-Award Wining DJ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoSection;
