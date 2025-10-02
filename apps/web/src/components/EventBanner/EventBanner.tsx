import type { FC } from "react";
import { Link } from "react-router-dom";

interface EventBannerProps {
  name: string;
  type: string;
  img: string;
  description: string;
}

const EventBanner: FC<EventBannerProps> = (props) => {
  return (
    <Link to="/events" className="select-none h-fit">
      <img className="w-full h-56 md:h-[560px] " src={props.img} />
      <div className="absolute w-full top-0 h-full  bg-black/50 text-white  ">
        <div className=" flex flex-col w-full h-full items-center justify-center">
          <h6 className="text-xs md:text-2xl text-[#C19D60] mb-4">{props.type}</h6>
          <h2 className="text-base md:text-6xl mb-8">{props.name}</h2>
          <p className="text-xs md:text-2xl md:w-1/2">{props.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventBanner;
