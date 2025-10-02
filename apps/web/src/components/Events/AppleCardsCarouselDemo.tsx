import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  // const cards = data.map((card, index) => (
  //     <Card key={card.src} card={card} index={index} layout={true} />
  // ));
  // return (
  //     <div className="w-full h-full py-20">
  //         <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
  //             Upcomming Events
  //         </h2>
  //         <Carousel items={cards} />
  //     </div>
  // );
}

const DummyContent = () => {
  return (
    <>
      <p className=" pb-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid praesentium expedita fuga
        nostrum. Unde vero saepe fugiat nemo, architecto, accusantium repellendus rem asperiores,
        est dolorum alias aliquid eos exercitationem tenetur! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Aliquid praesentium expedita fuga nostrum. Unde vero saepe
        fugiat nemo, architecto, accusantium repellendus rem asperiores, est dolorum alias aliquid
        eos exercitationem tenetur!
      </p>

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
    </>
  );
};

const data = [
  {
    category: "Weekly Event",
    title: "Friday Brunch",
    src: "/img/events/brunch-wallpaper.jpg",
    content: <DummyContent />,
  },
  {
    category: "Special Event",
    title: "New Year's Party",
    src: "/img/events/new-year-event.jpg",
    content: <DummyContent />,
  },
  {
    category: "Weekly Event",
    title: "Ladies Night",
    src: "/img/events/ladies-night-wallpaper.jpg",
    content: <DummyContent />,
  },
  {
    category: "Weekly Event",
    title: "Hookah's Night",
    src: "/img/events/hookah-night.jpg",
    content: <DummyContent />,
  },
];

type IEvent = {
  type: string;
  name: string;
  img: {
    key: string;
    url: string;
  };
  description: string;
};

const data2: IEvent[] = [
  {
    type: "Weekly Event",
    name: "Friday Brunch",
    img: {
      key: "/img/events/brunch-wallpaper.jpg",
      url: "/img/events/brunch-wallpaper.jpg",
    },
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Aliquid praesentium expedita fuga nostrum. Unde vero saepe fugiat nemo,
                        architecto, accusantium repellendus rem asperiores, est dolorum alias
                        aliquid eos exercitationem tenetur!,`,
  },
];
