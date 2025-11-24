import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import EventBanner from "../EventBanner/EventBanner";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Event } from "../Events/Events";
import axiosInstance from "@/api/axiosInstance";

export function EventCarousel() {
  const { data } = useQuery({
    queryKey: ["events-carousel"],
    queryFn: async () =>
      await axiosInstance.get<Event[]>("/events/list", {
        params: {
          type: "WEEKLY",
        },
      }),
  });

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
        {/* {events.map((event) => (
          <EventBanner
            key={event.id}
            name={event.name}
            type={event.type}
            img={event.thumbnail.url}
            description={event.description}
          />
        ))} */}
      </Carousel>
    </div>
  );
}
