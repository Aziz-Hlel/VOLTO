"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { foodData } from "@/data/menu/foodV2/food";

const SkipperFood = () => {
  const food = foodData;

  return (
    <div className="flex h-full w-screen items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_006
        images={food}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: {
    src: string;
    alt: string;
    title: string;
    price: string;
    description: string;
    allergies: string;
    category: string;
  }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  console.log("render");

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#313131] via-[#1a1a1a] to-[#111]">
      {/* TEXTURE */}
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20 pointer-events-none mix-blend-soft-light" />

      {/* GOLD PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4AF37]"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.4 + 0.1,
                filter: "blur(1px)",
                animation: `floatGold ${Math.random() * 6 + 4}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#d4af37]/20 blur-3xl"
              style={{
                width: Math.random() * 200 + 120 + "px",
                height: Math.random() * 200 + 120 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `pulseGold ${Math.random() * 4 + 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <Carousel
        setApi={setApi}
        className={cn("w-full", className)}
        opts={{
          loop,
          slidesToScroll: 1,
        }}
        plugins={
          autoplay
            ? [
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]
            : []
        }
      >
        <CarouselContent className="flex h-[600px] lg:h-[550px] w-full mt-20">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
            >
              {/* <AnimatePresence mode="wait">
                {current === index && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-2 space-y-1 flex h-[14%] w-full -translate-y-16  items-center justify-center text-center font-medium tracking-tight text-white z-50"
                  >
                    <div className="absolute w-[200rem] max-w-screen">
                      <h2 className=" text-4xl text-yellow-400">{img.category}</h2>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <motion.div
                initial={false}
                animate={{
                  clipPath:
                    current !== index
                      ? "inset(15% 0 15% 0 round 2rem)"
                      : "inset(0 0 0 0 round 2rem)",
                }}
                className="h-full w-full overflow-hidden rounded-3xl"
              >
                <div className="relative h-full w-full border">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full scale-105 object-cover"
                  />
                </div>
              </motion.div>
              <AnimatePresence mode="wait">
                {current === index && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-2 space-y-1 flex h-[14%] w-full pt-8 translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-white"
                  >
                    <div className="absolute w-[200rem] max-w-screen">
                      <h2 className="text-white text-xl md:text-2xl">
                        {img.title} - {img.price}
                      </h2>
                      <p className="text-white/80 text-sm md:text-sm max-w-screen px-4 ">
                        {img.description}
                      </p>
                      <p className=" text-muted-foreground text-xs md:text-sm max-w-screen px-4 ">
                        * Allergies : {img.allergies}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className=" w-fit mx-auto text-muted-foreground text-center text-xs md:text-sm">
          *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5% Gov. Levy
        </div>
        {/* Pagination */}
        {showPagination && (
          <div className="flex w-full items-center justify-center mt-4">
            <div className="flex items-center justify-center gap-0.5 md:gap-2">
              {Array.from({ length: images.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 w-2 md:h-4 md:w-4 rounded-full transition-all",
                    current === index ? "bg-[#D4AF37]" : "bg-[#D9D9D9]",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default SkipperFood;
