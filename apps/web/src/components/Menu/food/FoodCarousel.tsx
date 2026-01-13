"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { foodData } from "./foodData";

export function FoodCarousel({ category }: { category: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const food = foodData.filter((item) => item.category === category);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className=" w-full flex items-center pt-20 min-h-screen bg-gradient-to-br from-[#313131] via-[#1a1a1a] to-[#111]">
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
      </div>

      <div className="mx-auto  lg:h-full  lg:max-w-4xl  max-w-xs px-4">
        <Carousel
          setApi={setApi}
          className=" lg:h-full lg:w-full "
          opts={{ loop: true, slidesToScroll: 1,  }}
        >
          <CarouselContent className=" p-0 py-0">
            {food.map((item, index) => (
              <CarouselItem key={index} className="lg:basis-1/3 py-0">
                <Card className=" p-0">
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <img src={item.src} alt={item.alt} className=" rounded-xl" />
                    <div className=" text-center space-y-1">
                      <h2 className="text-yellow-600 text-xl lg:text-xl">
                        {item.title}
                      </h2>
                      <div>{item.price}</div>
                      <p className="text-black/80 text-sm lg:text-sm max-w-screen  ">
                        {item.description}
                      </p>
                    </div>
                    <div className=" h-full flex grow items-end justify-end">
                      <p className=" text-muted-foreground text-xs lg:text-sm max-w-screen px-4 ">
                        * Allergies : {item.allergies}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
        <div className=" w-fit mx-auto text-muted-foreground text-center text-xs lg:text-sm">
          *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5% Gov. Levy
        </div>
      </div>
    </div>
  );
}
