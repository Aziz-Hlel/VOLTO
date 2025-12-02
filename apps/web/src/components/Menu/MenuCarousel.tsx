"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

import { cn } from "@/lib/utils";
import { menuImages } from "./menu-images";

export type MenuCarouselTypes = "Food" | "Cocktails" | "Hookah";

const MenuCarousel = ({
  menuType,
  className,
  showPagination = true,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  menuType: MenuCarouselTypes;
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const images = menuImages[menuType];
  // console.log('images :',images)

  const css = `
  .Carousal_003 {
    width: 100%;
    height: 520px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }

`;

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Fullscreen]}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        animation={{ fade: 300, swipe: 100 }}
      />

      <motion.div
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.5,
        }}
        className={cn("relative w-full h-full  px-5 my-auto", className)}
      >
        <style>{css}</style>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Swiper
            spaceBetween={spaceBetween}
            autoplay={
              autoplay
                ? {
                    delay: 1500,
                    disableOnInteraction: true,
                  }
                : false
            }
            effect="coverflow"
            grabCursor={true}
            slidesPerView="auto"
            centeredSlides={true}
            loop={loop}
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={
              showPagination
                ? {
                    clickable: true,
                  }
                : false
            }
            navigation={
              showNavigation
                ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }
                : false
            }
            className="Carousal_003 h-[30rem] w-[40rem] "
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className=" h-full">
                <img
                  className="h-[30rem] w-[40rem] object-cover"
                  src={image}
                  onClick={() => {
                    setIndex(index);
                    setOpen(true);
                  }}

                  // alt={image.alt}
                />
              </SwiperSlide>
            ))}
            {showNavigation && (
              <div>
                <div className="swiper-button-next after:hidden">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </div>
                <div className="swiper-button-prev after:hidden">
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            )}
          </Swiper>
        </motion.div>
      </motion.div>
    </>
  );
};

export { MenuCarousel };
