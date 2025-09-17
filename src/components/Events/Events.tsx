import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { IEventCategory } from "@/types/EventCategory";



const Events = () => {

    const upcommingEvents = upcommingEventsData.map((event, index) => (
        <Card key={event.id} event={event} index={index} layout={true} />
    ));

    const previousEvents = previousEventsData.map((event, index) => (
        <Card key={event.id} event={event} index={index} layout={true} />
    ));

    return (
        <>

            <div className='max-w-screen px-4 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:min-w-6xl mx-auto  '>
                <div className="w-full h-full mt-20 md:pt-10 ">
                    <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                        Upcomming Events
                    </h2>


                    <Carousel events={upcommingEvents} />
                </div>

                <div className="w-full h-full md:py-10">
                    <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                        Previous Events
                    </h2>


                    <Carousel events={previousEvents} />
                </div>
            </div>

            {/* <div className='2xl:min-w-7xl 2xl:max-w-9/12 xl:max-w-6xl lg:max-w-5xl md:max-w-2xl max-w-screen px-4  mx-auto '>
                <AppleCardsCarouselDemo />
            </div> */}

        </>
    )
}

export default Events


export type ICard = {
    id: string;
    media: {
        img: {
            key: string;
            url: string;
        },
        video: {
            key: string;
            url: string;
        }
    }

    title: string;
    category: IEventCategory;
    content: React.ReactNode;
    startDate: Date;
    endDate: Date;
    isLadiesNight: boolean;
};

const DummyContent = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {

    const pastEvent = endDate < new Date();
    return (
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

            {!pastEvent && <div className=" flex w-full justify-end gap-4 ">

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
    );
};






type IEvent = {
    id: string;
    type: "weekly" | "special";
    name: string;
    media: {
        img: {
            key: string;
            url: string;
        },
        video: {
            key: string;
            url: string;
        }
    }
    description: string;
    startDate: Date;
    endDate: Date;
    isLadiesNight: boolean
};


const data2: IEvent[] = [
    {
        id: "1",
        type: "weekly",
        name: "Friday Brunch",
        media: {
            img: {
                key: "/img/events/brunch-wallpaper.jpg",
                url: "/img/events/brunch-wallpaper.jpg",
            },
            video: {
                key: "/videos/friday-brunch.mp4",
                url: "/videos/friday-brunch.mp4",
            },
        },

        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!,`,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
        isLadiesNight: false,
    },
    {
        id: "2",
        type: "special",
        name: "New Year's Party",
        media: {
            img: {
                key: "/img/events/new-year-event.jpg",
                url: "/img/events/new-year-event.jpg",
            },
            video: {
                key: "/videos/new-year-party.mp4",
                url: "/videos/new-year-party.mp4",
            },
        },
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!`,
        isLadiesNight: false,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-10T15:00:00Z"),

    },
    {
        id: "3",
        type: "weekly",
        name: "Ladies Night",
        media: {
            img: {
                key: "/img/events/ladies-night-wallpaper.jpg",
                url: "/img/events/ladies-night-wallpaper.jpg",
            },
            video: {
                key: "/videos/ladies-night.mp4",
                url: "/videos/ladies-night.mp4",
            },
        },
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!`,
        isLadiesNight: true,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
    },
    {
        id: "4",
        type: "weekly",
        name: "Hookah's Night",
        media: {
            img: {
                key: "/img/events/hookah-night.jpg",
                url: "/img/events/hookah-night.jpg",
            },
            video: {
                key: "/videos/hookahs-night.mp4",
                url: "/videos/hookahs-night.mp4",
            },
        },
        description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!`,
        isLadiesNight: false,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
    },



];







const upcommingEventsData: ICard[] = [
    {
        id: "1",
        category: "WEEKLY",
        title: "Friday Brunch",
        media: {
            img: {
                url: "/img/events/brunch-wallpaper.jpg",
                key: "/img/events/brunch-wallpaper.jpg"
            },
            video: {
                url: "/videos/friday-brunch.mp4",
                key: "/videos/friday-brunch.mp4"
            },
        },
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
        isLadiesNight: false,
        content: <DummyContent startDate={new Date("2023-11-01T10:00:00Z")} endDate={new Date("2023-11-01T15:00:00Z")} />,
    },
    {
        id: "2",
        category: "SPECIAL",
        title: "New Year's Party",
        media: {
            img: {
                url: "/img/events/new-year-event.jpg",
                key: "/img/events/new-year-event.jpg"
            },
            video: {
                url: "/videos/new-year-party.mp4",
                key: "/videos/new-year-party.mp4",
            },
        },
        isLadiesNight: false,
        startDate: new Date("2025-11-15T10:00:00Z"),
        endDate: new Date("2025-11-15T15:00:00Z"),
        content: <DummyContent startDate={new Date("2023-11-15T10:00:00Z")} endDate={new Date("2023-11-15T15:00:00Z")} />,
    },
    {
        id: "3",
        category: "WEEKLY",
        title: "Ladies Night",
        media: {
            img: {
                url: "/img/events/ladies-night-wallpaper.jpg",
                key: "/img/events/ladies-night-wallpaper.jpg"
            },
            video: {
                url: "/videos/ladies-night.mp4",
                key: "/videos/ladies-night.mp4",
            },
        },
        isLadiesNight: true,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
        content: <DummyContent startDate={new Date("2023-11-01T10:00:00Z")} endDate={new Date("2023-11-01T15:00:00Z")} />,
    },
    {
        id: "4",
        category: "WEEKLY",
        title: "Hookah's Night",
        media: {
            img: {
                url: "/img/events/hookah-night.jpg",
                key: "/img/events/hookah-night.jpg"
            },
            video: {
                url: "/videos/hookahs-night.mp4",
                key: "/videos/hookahs-night.mp4",
            },
        },
        isLadiesNight: false,
        startDate: new Date("2023-11-01T10:00:00Z"),
        endDate: new Date("2023-11-01T15:00:00Z"),
        content: <DummyContent startDate={new Date("2023-11-01T10:00:00Z")} endDate={new Date("2023-11-01T15:00:00Z")} />,
    },


];





const previousEventsData: ICard[] = [
    {
        id: "10",
        category: "SPECIAL",
        title: "Halloween",
        media: {
            img: {
                url: "/img/events/halloween-event.jpg",
                key: "/img/events/halloween-event.jpg"
            },
            video: {
                url: "/videos/halloween-bash.mp4",
                key: "/videos/halloween-bash.mp4",
            },
        },
        isLadiesNight: false,
        startDate: new Date("2023-10-31T18:00:00Z"),
        endDate: new Date("2023-10-31T18:59:59Z"),
        content: <DummyContent startDate={new Date("2023-10-31T18:00:00Z")} endDate={new Date("2023-10-31T18:59:59Z")} />,
    },
    {
        id: '12',
        category: "SPECIAL",
        title: "EID",
        media: {
            img: {
                url: "/img/events/eid-event.jpg",
                key: "/img/events/eid-event.jpg",
            },
            video: {
                url: "/videos/eid.mp4",
                key: "/videos/eid.mp4",
            },
        },
        isLadiesNight: false,
        startDate: new Date("2023-11-01T18:00:00Z"),
        endDate: new Date("2023-11-01T23:59:59Z"),
        content: <DummyContent startDate={new Date("2023-11-01T18:00:00Z")} endDate={new Date("2023-11-01T23:59:59Z")} />,
    },
]