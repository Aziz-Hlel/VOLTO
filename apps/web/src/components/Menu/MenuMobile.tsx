"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const Skiper53 = () => {
  const images = [
    {
      src: "/img/galleryImgsBanner/13.jpg",
      alt: "Illustrations by my fav AarzooAly",
      code: "# 23",
    },
    {
      src: "/img/galleryImgsBanner/9.jpg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/img/galleryImgsBanner/20.jpg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/img/galleryImgsBanner/21.jpg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
    {
      src: "/img/galleryImgsBanner/25.jpg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },

    {
      src: "/img/galleryImgsBanner/12.jpg",
      alt: "Illustrations by ©AarzooAly",
      code: "# 23",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <HoverExpand_002 className="" images={images} />
    </div>
  );
};

export { Skiper53 };

const HoverExpand_002 = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

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
        <div className="flex w-full flex-col items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ height: "2.5rem", width: "24rem" }}
              animate={{
                height: activeImage === index ? "24rem" : "2.5rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                  >
                    <p className="text-left text-xs text-white/50">
                      {image.code}
                      <div>menu volto</div>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img src={image.src} className="size-full object-cover" alt={image.alt} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_002 };

/**
 * Skiper 53 HoverExpand_002 — React + Framer Motion
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
