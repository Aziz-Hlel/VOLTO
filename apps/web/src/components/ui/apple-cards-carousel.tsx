"use client";
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext,
    type JSX,
} from "react";

import { ArrowLeft, ArrowRight, Info, X, CalendarSync } from 'lucide-react';

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AspectRatio } from "./aspect-ratio";
import type { ICard } from "../Events/Events";
import EventCategory from "@/types/EventCategory";

interface CarouselProps {
    events: JSX.Element[];
    initialScroll?: number;
}

type Card = {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
};

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => { },
    currentIndex: 0,
});

export const Carousel = ({ events, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const isMobile = () => {
        return window && window.innerWidth < 768;
    };

    return (
        <CarouselContext.Provider
            value={{ onCardClose: handleCardClose, currentIndex }}
        >
            <div className="relative w-full">
                <div
                    className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth pt-10 pb-4 [scrollbar-width:none] md:pt-8 md:pb-4"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div
                        className={cn(
                            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l",
                        )}
                    ></div>

                    <div
                        className={cn(
                            "flex flex-row justify-start gap-4 pl-4",
                            "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
                        )}
                    >
                        {events.map((event, index) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.2 * index,
                                        ease: "easeOut",
                                        // once: true,
                                    },
                                }}
                                key={"card" + index}
                                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                            >
                                {event}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="mr-10 flex justify-end gap-2">
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                    >
                        <ArrowLeft className="h-6 w-6 text-gray-500" />
                    </button>
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                    >
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};

export const Card = ({
    event,
    index,
    layout = false,
}: {
    event: ICard;
    index: number;
    layout?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose, currentIndex } = useContext(CarouselContext);

    useEffect(() => {
        // if (event.id === "2")
        //     setOpen(true)
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onCardClose(index);
    };

    type IDay = { prefix: string; suffix: string; };

    const days: IDay[] = [
        { prefix: "SUN", suffix: "DAY" },
        { prefix: "MON", suffix: "DAY" },
        { prefix: "TUE", suffix: "DAY" },
        { prefix: "WEDNES", suffix: "DAY" },
        { prefix: "THU", suffix: "DAY" },
        { prefix: "FRI", suffix: "DAY" },
        { prefix: "SATUR", suffix: "DAY" },
    ]

    const wekklyEventDay = event.category === "WEEKLY" && event.startDate.getDay();
    const isRecurring = event.category === "SPECIAL" && event.startDate.getDate() !== event.endDate.getDate();

    const startDay = event.startDate.getDate();
    const endDay = event.endDate.getDate();
    const month = event.startDate.toLocaleString('default', { month: 'long' }).toUpperCase().slice(0, 3);

    const isUpcommingEvent = event.category === "WEEKLY" || event.endDate > new Date();

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 p-4 z-[99] h-screen overflow-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${event.title}` : undefined}
                            className="relative z-[60] mx-auto  h-fit  w-full  md:max-w-3xl rounded-3xl bg-white  font-sans  dark:bg-neutral-900"
                        >
                            <button
                                className=" absolute  top-4  right-4 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                                onClick={handleClose}
                            >
                                <X className="h-6 w-6 text-neutral-100 dark:text-neutral-900 z-50" />
                            </button>
                            {/* // ! Houni 
 */}

                            <AspectRatio ratio={4 / 3} className=" bg-muted w-full rounded-t-2xl">
                                <video src={"/img/events/volto-brunch-1.mp4"} controls autoPlay muted className="h-full w-full rounded-none object-cover rounded-t-2xl" />
                            </AspectRatio>
                            {/* <motion.p
                                layoutId={layout ? `src-${card.src}` : undefined}
                                className="mt-4 text-2xl font-semibold rounded-t-2xl text-neutral-700 md:text-5xl"
                            >
                            </motion.p> */}

                            <div className=" px-4 py-8 md:px-12 md:py-12">

                                <div className=" w-full grid grid-cols-3 grid-rows-[auto_auto] border-b border-black/25 pb-4 sm:pb-8">

                                    <div className=" col-span-2 ">
                                        <motion.p
                                            layoutId={layout ? `category-${event.title}` : undefined}
                                            className="text-pretty  text-xs font-light  md:text-base md:font-medium text-neutral-700 sm:text-black"
                                        >
                                            {EventCategory[event.category]}
                                        </motion.p>
                                        <motion.p
                                            layoutId={layout ? `title-${event.title}` : undefined}
                                            className="text-lg sm:text-4xl md:text-5xl text-black sm:text-neutral-700 "
                                        >
                                            {event.title}
                                        </motion.p>
                                    </div>

                                    <div className=" col-span-1 flex flex-col items-end  justify-end w-full ">
                                        {event.category === "SPECIAL" && !isRecurring &&
                                            <>
                                                <div className=" text-xs sm:text-base font-extralight sm:font-medium">{month}</div>
                                                <div className=" border-b-2 sm:border-b-4 w-8 md:w-12 border-pink-700" />
                                                <div className=" text-lg sm:text-4xl md:text-6xl">{startDay}</div>
                                                {/* <div>JULY</div> */}
                                            </>
                                        }

                                        {event.category === "WEEKLY" &&
                                            <>
                                                <div className="flex text-sm gap-1">
                                                    <span className=" text-xs sm:text-base font-thin text-neutral-700 sm:text-black" >
                                                        EVERY
                                                    </span>
                                                    <CalendarSync className=" stroke-2 size-4 text-pink-700" />
                                                </div>

                                                <div>
                                                    <span className="text-lg sm:text-2xl md:text-4xl "> {days[wekklyEventDay as number].prefix}</span>
                                                    <span className="text-lg sm:text-2xl md:text-4xl text-pink-700">{days[wekklyEventDay as number].suffix}</span>
                                                </div>
                                            </>
                                        }


                                        {/* <div className="flex flex-col items-end text-sm gap-1">
                                            <span className="text-neutral-500">EVERY</span>
                                            <div className="flex items-center gap-1">
                                                <CalendarSync className="stroke-2 size-4 text-pink-700" />
                                                <span className="text-neutral-500">THURSDAY</span>
                                            </div>
                                        </div> */}

                                        {event.category === "SPECIAL" && isRecurring &&
                                            <div className="flex flex-col items-end ">

                                                <div className=" text-xs sm:text-sm font-extralight sm:font-semibold text-neutral-700 sm:text-black ">{month}</div>

                                                <div className="flex text-lg sm:text-2xl md:text-6xl items-end">
                                                    <div className=" text-pink-700 ">{startDay}</div>
                                                    <div className=" ">-</div>
                                                    <div className=" text-pink-700 ">{endDay}</div>
                                                </div>

                                            </div>
                                        }

                                    </div>
                                    <div className="col-span-2 h-fit" />
                                    <div className="text-xs font-light sm:text-sm col-span-1 h-fit  text-neutral-500 text-right" >From 6PM to 10PM</div>
                                </div>

                                <div className=" py-4 sm:py-10">
                                    {/* {event.content} */}
                                    <>
                                        <p className=" text-xs leading-6 tracking-wide   pb-8 sm:pb-12">
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                            Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                                            architecto, accusantium repellendus rem asperiores, est dolorum alias
                                            aliquid eos exercitationem tenetur!
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                            Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                                            architecto, accusantium repellendus rem asperiores, est dolorum alias
                                            aliquid eos exercitationem tenetur!
                                        </p>

                                        {isUpcommingEvent && <div className=" flex w-full justify-end gap-4 ">

                                            <button className="relative inline-flex w-36 h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-600 via-pink-700 to-pink-600 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                                    Make Reservation
                                                </span>
                                            </button>

                                            <button
                                                className="w-36 h-10 rounded-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] 
                                    text-[14px] text-[#796703] font-semibold flex items-center justify-center gap-2 
                                    shadow-md bg-[length:200%_200%] transition-all duration-[3000ms] ease-in-out 
                                    hover:scale-95 hover:bg-[position:right] cursor-pointer font-sans">
                                                <svg viewBox="0 0 576 512" height="1em" className="w-4 h-4">
                                                    <path
                                                        fill="#796703"
                                                        d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
                                                    />
                                                </svg>
                                                Book VIP Table
                                            </button>
                                        </div>}

                                    </>

                                </div>
                            </div>
                            <div className=" w-full flex justify-center items-center gap-2 text-xs py-8">

                                <Info className=" text-pink-700" />
                                <div className=" flex flex-col">
                                    <span>Dress Code : Smart casual  </span>
                                    <span>No shorts and no open shoes </span>
                                    <span>Age Required - 18+</span>

                                </div>


                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <motion.button
                layoutId={layout ? `card-${event.title}` : undefined}
                onClick={handleOpen}
                className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-auto md:aspect-[9/16]  md:w-72 dark:bg-neutral-900"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                <div className="relative z-40 p-8">
                    <motion.p
                        layoutId={layout ? `category-${event.id}` : undefined}
                        className="text-left font-sans text-sm font-medium md:text-base bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent "
                    >
                        {event.category}
                    </motion.p>
                    <motion.p
                        layoutId={layout ? `title-${event.title}` : undefined}
                        className={cn("mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl", event.category === "SPECIAL" && "bg-gradient-to-r from-gray-400 to-gray-600")}
                    >
                        {event.title}
                    </motion.p>
                </div>
                <BlurImage
                    layoutId={layout ? `src-${event.media.img.url}` : undefined}
                    src={event.media.img.url}
                    alt={event.title}
                    fill
                    className="absolute inset-0 z-10 object-cover hover:scale-110 "
                />
            </motion.button>
        </>
    );
};

export const BlurImage = ({
    height,
    width,
    src,
    className,
    alt,
    ...rest
}: any) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <img
            className={cn(
                "h-full w-full transition duration-300",
                isLoading ? "blur-sm" : "blur-0",
                className,
            )}
            onLoad={() => setLoading(false)}
            src={src as string}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            alt={alt ? alt : "Background of a beautiful view"}
            {...rest}
        />
    );
};
