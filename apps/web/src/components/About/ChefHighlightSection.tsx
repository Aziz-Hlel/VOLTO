

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
                            <div className="text-sm tracking-[3px] text-[#C19D60] uppercase mb-2">20 Year of Experience</div>
                            <h2 className="text-6xl font-serif text-white">Ceo & Co-Founder</h2>
                        </div>
                        <p className="text-gray-300  leading-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Minima repellendus tempora repellat mollitia repudiandae eum maiores molestias ex illum
                            labore dolorum beatae architecto quisquam earum dolores incidunt aut, non tenetur?
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
    )
}


export default CeoSection