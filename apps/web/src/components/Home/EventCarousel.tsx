import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import EventBanner from "../EventBanner/EventBanner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Event } from "../Events/Events";
import axiosInstance from "@/api/axiosInstance";

const events = [
  {
    id: 1,
    name: "Lady's Night",
    type: "Weekly Event",
    img: "/img/ladiesNight.png",
    description: `       
            Join us every Tuesday for Lady's night,
            our exclusive weekly event celebrating the women who light up the night.
            All ladies enjoy 3 complimentary drinks — on the house.`,
  },
  {
    id: 2,
    name: "Hooka's Night",
    type: "Weekly Event",
    img: "/img/hookasNight.jpg",
    description: `
            Join us every Thursday for Hooka's night,
            our exclusive weekly event celebrating the women who light up the night.
            All ladies enjoy 3 complimentary drinks — on the house.`,
  },
  {
    id: 3,
    name: "Friday Brunch",
    type: "Weekly Event",
    img: "/img/fridayBrunch.png",
    description: `
            Join us every Friday for Friday brunch,
            our exclusive weekly event celebrating the women who light up the night.
            All ladies enjoy 3 complimentary drinks — on the house.`,
  },
];

export function EventCarousel() {


  const {data}= useQuery({
    queryKey: ["events-carousel"],
    queryFn: async () => await axiosInstance.get<Event[]>("/events/list",{
      params:{
        type:"WEEKLY"
      }
    }),
  })

  const events = data?.data || [];

  return (
    <div className=" w-full flex   justify-center cursor-pointer" dir="ltr">
      <Carousel
        autoPlay
        stopOnHover
        swipeable
        showThumbs={false}
        showStatus={false}
        emulateTouch
        infiniteLoop
        interval={2000}
        className=" w-full  h-fit"
      >
        {events.map((event) => (
          <EventBanner
            key={event.id}
            name={event.name}
            type={event.type}
            img={event.thumbnail.url}
            description={event.description}
          />
        ))}
      </Carousel>
    </div>
  );
}
