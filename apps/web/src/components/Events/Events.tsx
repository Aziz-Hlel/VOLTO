import axiosInstance from "@/api/axiosInstance";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import type { IEventCategory } from "@/types/EventCategory";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type EventType = "WEEKLY" | "SPECIAL";

export const EventType = {
  WEEKLY: "WEEKLY",
  SPECIAL: "SPECIAL",
};

type Event = {
  id: string;
  name: string;
  description: string;
  type: EventType;
  startDate: Date | null;
  endDate: Date | null;
  cronStartDate: string | null;
  cronEndDate: string | null;
  isLadiesNight: boolean;

  createdAt: Date;
  updatedAt: Date;

  thumbnail: {
    s3Key: string;
    url: string;
  };
  video: {
    s3Key: string;
    url: string;
  };
};

const Events = () => {
  const fetchEvents = async () => {
    const response = await axiosInstance.get<Event[]>("/events/");
    return response.data;
  };
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    enabled: true,
  });

  const events = data || [];

  const upcommingEventsData = events.filter(
    (event) => event.type === "SPECIAL" && event.startDate && event.startDate > new Date(),
  );
  const weeklyEventsData = events.filter((event) => event.type === "WEEKLY");
  const previousEventsData = events.filter(
    (event) => event.type === "SPECIAL" && event.startDate && event.startDate < new Date(),
  );

  const weeklyAndUpcommingEventsData = [...weeklyEventsData, ...upcommingEventsData];

  const weeklyAndUpcommingEventsDataComponents: ICard[] = weeklyAndUpcommingEventsData.map(
    (event, index) => ({
      id: event.id,
      category: event.type,
      title: event.name,
      media: {
        img: {
          url: event.thumbnail.url,
          key: event.thumbnail.s3Key,
        },
        video: {
          url: event.video.url,
          key: event.video.s3Key,
        },
      },
      startDate: event.startDate || new Date(),
      endDate: event.endDate || new Date(),
      isLadiesNight: event.isLadiesNight,
      content: (
        <DummyContent
          startDate={event.startDate || new Date()}
          endDate={event.endDate || new Date()}
        />
      ),
    }),
  );

  const previousEventsDataComponents: ICard[] = previousEventsData.map((event, index) => ({
    id: event.id,
    category: event.type,
    title: event.name,
    media: {
      img: {
        url: event.thumbnail.url,
        key: event.thumbnail.s3Key,
      },
      video: {
        url: event.video.url,
        key: event.video.s3Key,
      },
    },
    startDate: event.startDate || new Date(),
    endDate: event.endDate || new Date(),
    isLadiesNight: event.isLadiesNight,
    content: (
      <DummyContent
        startDate={event.startDate || new Date()}
        endDate={event.endDate || new Date()}
      />
    ),
  }));

  const upcommingEvents = weeklyAndUpcommingEventsDataComponents.map((event, index) => (
    <Card key={event.id} event={event} index={index} layout={true} />
  ));

  const previousEvents = previousEventsDataComponents.map((event, index) => (
    <Card key={event.id} event={event} index={index} layout={true} />
  ));

  return (
    <>
      <div className="relative">
        {/* Background Overlay Noir & Or */}
        <div className="absolute inset-0 overflow-hidden -z-10 ">
          {/* Dégradé principal noir & or */}
          <div className="absolute inset-0 bg-gradient-to-b  from-black via-[#0a0a0a] to-black opacity-95 backdrop-blur-[3px]"></div>

          {/* Halo doré animé - en haut à gauche */}
          <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-[#C19D60]/15 blur-[150px] rounded-full animate-pulseGold"></div>

          {/* Halo doré animé - en bas à droite */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C19D60]/20 blur-[180px] rounded-full animate-glowGold opacity-40"></div>

          {/* Dégradé mobile flottant */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#C19D60]/10 via-[#b8914f]/20 to-transparent blur-[100px] rounded-full mix-blend-screen animate-floatSlow"></div>

          {/* Particules scintillantes */}
          <div className="absolute inset-0 overflow-hidden ">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[3px] h-[3px] bg-[#C19D60] rounded-full opacity-60 animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="w-full h-full mt-20 md:pt-10 ">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans flex items-center gap-3">
            <img
              src="/img/events/upcoming-events-icon.svg"
              alt="Upcoming Event Icon"
              className="h-8 w-8 md:h-12 md:w-12"
            />
            Upcoming Events
          </h2>

          <Carousel events={upcommingEvents} />
        </div>

        <div className="w-full h-full md:py-10">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans flex items-center gap-3">
            <img
              src="/img/events/previous-events-icon.svg"
              alt="Upcoming Event Icon"
              className="h-8 w-8 md:h-12 md:w-12"
            />
            Previous Events
          </h2>

          {previousEvents.length > 0 ? (
            <Carousel events={previousEvents} />
          ) : (
            <p className="max-w-7xl text-center pl-4 mx-auto text-white font-sans py-10">
              No previous events available at the moment. Please check back later!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Events;

export type ICard = {
  id: string;
  media: {
    img: {
      key: string;
      url: string;
    };
    video: {
      key: string;
      url: string;
    };
  };

  title: string;
  category: IEventCategory;
  content: React.ReactNode;
  startDate: Date;
  endDate: Date;
  isLadiesNight: boolean;
};

const DummyContent = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const pastEvent = endDate < new Date();
  return (
    <>
      <p className=" text-xs leading-6 tracking-wide   pb-8 sm:pb-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid praesentium expedita fuga
        nostrum. Unde vero saepe fugiat nemo, architecto, accusantium repellendus rem asperiores,
        est dolorum alias aliquid eos exercitationem tenetur! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Aliquid praesentium expedita fuga nostrum. Unde vero saepe
        fugiat nemo, architecto, accusantium repellendus rem asperiores, est dolorum alias aliquid
        eos exercitationem tenetur!
      </p>

      {!pastEvent && (
        <div className=" flex w-full justify-end gap-4 ">
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
                                    hover:scale-95 hover:bg-[position:right] cursor-pointer font-sans"
          >
            <svg viewBox="0 0 576 512" height="1em" className="w-4 h-4">
              <path
                fill="#796703"
                d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
              />
            </svg>
            Book VIP Table
          </button>
        </div>
      )}
    </>
  );
};
