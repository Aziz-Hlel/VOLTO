"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { FoodCategory } from "@/data/menu/foodV2/category";

const HorizontalCategorySkipper = ({
  images,
  className,
}: {
  images: FoodCategory[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  const navigate = useNavigate();

  const handleClick = (index: number) => {
    if (activeImage === index) {
      // const path = images[index].path;
      // navigate("/menu/food/" + path);
    }
    setActiveImage(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "30rem" : "5rem",
                height: activeImage === index ? "30rem" : "30rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => handleClick(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                  ></motion.div>
                )}
              </AnimatePresence>
              <div className=" w-full h-full absolute inset-0 bg-gradient-to-b to-black/80 transition-opacity duration-300" />
              {activeImage === index && (
                <div className=" absolute bottom-0 w-full text-white p-8 text-2xl font-semibold">
                  {image.name}
                </div>
              )}
              {/* <img src={image.src} className="size-full object-cover" alt={image.alt} /> */}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HorizontalCategorySkipper;
