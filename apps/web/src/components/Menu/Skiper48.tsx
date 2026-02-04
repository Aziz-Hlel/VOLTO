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
import { cocktails, type ICocktail } from "@/data/menuV2/cocktails";
import HsanBackground from "@/utils/HsanBackground";

const Skiper48 = () => {
  return (
    <Carousel_006 images={cocktails} loop={true} showNavigation={true} showPagination={true} />
  );
};

interface Carousel_006Props {
  images: ICocktail[];
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
    <div className="w-full min-h-screen flex items-start justify-start pt-20 overflow-hidden bg-gradient-to-br from-[#313131] via-[#1a1a1a] to-[#111]">
      <HsanBackground />

      <Carousel
        setApi={setApi}
        className={cn("w-full h-[55dvh] lg:h-[55dvh] ", className)}
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
        <div className="flex h-[68dvh] md:h-[85dvh] xl:h-[85dvh]  w-full">
          <CarouselContent className="flex h-full w-full">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className=" flex flex-col h-[70%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[55%] lg:basis-[50%] xl:basis-[21%]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    clipPath:
                      current !== index
                        ? "inset(15% 0 15% 0 round 2rem)"
                        : "inset(0 0 0 0 round 2rem)",
                  }}
                  className="h-full w-full rounded-3xl"
                >
                  {/* <img
                    src={img.src_original}
                    alt={img.alt}
                    className="h-full w-full scale-105 object-cover"
                  /> */}
                  <picture className=" h-full">
                    <source srcSet={img.src_avif} type="image/avif" />
                    <source srcSet={img.src_webp} type="image/webp" />
                    <img
                      src={img.src_original}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                  <AnimatePresence mode="wait"></AnimatePresence>
                </motion.div>
                <div className=" relative w-full  ">
                  {current === index && (
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.5 }}
                      className=" space-y-1 absolute bottom-0 translate-y-full text-white text-center pt-4 w-full "
                    >
                      <div className="flex flex-col font-['Cinzel'] space-y-1 lg:space-y-2 ">
                        <h2 className=" text-white text-xl md:text-3xl  font-bold">{img.title}</h2>
                        <p className="relative text-base pl-2.5 leading-tight z-50 left-1/2 -translate-x-1/2 w-screen  ">
                          {img.description}
                        </p>
                        <span className=" text-lg md:text-xl font-semibold">{img.price}</span>
                        <p className="relative z-50 text-base pl-2.5 left-1/2 h-0 -translate-x-1/2 w-screen ">
                          {img.phrases}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className=" mt-auto flex-1 flex flex-col">
          <div className=" w-fit mx-auto text-muted-foreground text-center leading-tight mt-12 sm:-mt-4 lg:mt-0 text-xs lg:text-sm">
            *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5% Gov.
            Levy
          </div>
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
        </div>
        {/* Bouton sous la pagination */}
      </Carousel>
    </div>
  );
};

export { Skiper48 };
