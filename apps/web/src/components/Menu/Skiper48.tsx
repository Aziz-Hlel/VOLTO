"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const Skiper48 = () => {
  const cocktails = [
    {
      src: "/img/menu/carousel/cocktail/taki69.png",
      alt: "Taki 69 Cocktail",
      title: "Taki 69",
      price: "8 BD",
      description: "White rum, Dark rum, Overproof rum, Orange juice, Grenadine syrup",
    },
    {
      src: "/img/menu/carousel/cocktail/greenHill.png",
      alt: "Green Hill Cocktail",
      title: "Green Hill",
      price: "8 BD",
      description: "Vodka, Basil, Cucumber, Sour mix",
    },
    {
      src: "/img/menu/carousel/cocktail/LaVolto.png",
      alt: "La Volto Cocktail",
      title: "La Volto",
      price: "8 BD",
      description: "White rum, Dark rum, Malibu, Blue curacao",
    },
    {
      src: "/img/menu/carousel/cocktail/taki69.png",
      alt: "Taki 69 Cocktail",
      title: "Taki 69",
      price: "8 BD",
      description: "White rum, Dark rum, Overproof rum, Orange juice, Grenadine syrup",
    },
    {
      src: "/img/menu/carousel/cocktail/greenHill.png",
      alt: "Green Hill Cocktail",
      title: "Green Hill",
      price: "8 BD",
      description: "Vodka, Basil, Cucumber, Sour mix",
    },
    {
      src: "/img/menu/carousel/cocktail/LaVolto.png",
      alt: "La Volto Cocktail",
      title: "La Volto",
      price: "8 BD",
      description: "White rum, Dark rum, Malibu, Blue curacao",
    },
  ];

  return (
    <div className="flex h-full w-screen items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_006
        images={cocktails}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string; price: string; description: string }[];
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
        <CarouselContent className="flex h-[600px] w-full">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
            >
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
                    className="absolute bottom-0 left-2 space-y-1 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-white"
                  >
                    <div className="">
                      <h2 className="text-white text-lg md:text-2xl">
                        {img.title} - {img.price}
                      </h2>
                      <p className="text-white/80 text-xs md:text-sm">{img.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Pagination */}
        {showPagination && (
          <div className="flex w-full items-center justify-center mt-4">
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: images.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-3 w-3 md:h-4 md:w-4 rounded-full transition-all",
                    current === index ? "bg-[#D4AF37]" : "bg-[#D9D9D9]",
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bouton sous la pagination */}

        <button
          className=" translate-y-12
    mr-5              
    float-right       
    rounded-full 
    bg-[#D4AF37] 
    px-6 py-3 
    text-black 
    font-semibold 
    hover:bg-yellow-500 
    transition-colors
    md:mt-0 md:mr-0 md:absolute md:bottom-8 md:right-8 /* desktop : position absolue bas à droite */
  "
        >
          <Link to="all">View the full menu</Link>
        </button>
      </Carousel>
    </div>
  );
};

export { Skiper48 };

/**
 * Skiper 48 Carousel_006 — React + Framer Motion
 * Built with shadcn/ui And Embla Carousel - Read docs to learn more https://ui.shadcn.com/docs/components/carousel https://embla-carousel.com/
 *
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
