import { AspectRatio } from "../ui/aspect-ratio";

const AboutUsSection = () => {
    return (
        <section className="py-32 bg-white  min-h-screen flex items-center">
            <div className="   2xl:min-w-7xl 2xl:max-w-9/12 xl:max-w-6xl lg:max-w-5xl md:max-w-2xl max-w-xl px-4  mx-auto mb-32 ">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column - Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <div className="mb-6">
                            <div className="text-sm tracking-[3px] text-[#C19D60] uppercase mb-2">Volto Restaurant</div>
                            <h2 className="text-4xl font-serif text-[#1b1b1b]">Few Words About Us</h2>
                        </div>
                        <p className="text-[#777] leading-8">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Perferendis hic voluptates, nostrum quaerat dolores suscipit neque eius.
                            Cum eveniet nemo, quos eligendi excepturi accusamus dignissimos accusantium
                            repellat hic saepe fugit? 
                      <div>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.
                        </div>
                        </p>
                        <p className="text-[#777] leading-8">
                            Wine porta laoreet ante, luctus maximus ipsum blandit eget. Integer mollis eniman metus, eget consequat
                            enim commodo eduis id magna arcu duis nec elit praesent convallis et justo nec tristique sapien quis.
                        </p>


                    </div>

                    {/* Right Column - Images */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-8 items-start">
                        <AspectRatio ratio={3 / 4} className="bg-muted rounded-none  h-full mt-24">
                            <img src="img/about/volto-outside.webp" alt="About 2" className=" h-full w-full rounded-none object-cover" />
                        </AspectRatio>

                        <AspectRatio ratio={3 / 4} className="bg-muted rounded-none">
                            <img src="img/about/volto-about2.webp" alt="About" className=" h-full w-full rounded-none object-cover" />
                        </AspectRatio>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection;