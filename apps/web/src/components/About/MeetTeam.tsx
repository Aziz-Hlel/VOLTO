import axiosInstance from "@/api/axiosInstance";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types/teamMember";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const TeamMemberCard = ({ teamMember }: { teamMember: TeamMember }) => {
  const gif =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif";

  const bgImage = teamMember.image.url;

  return (
    <div className="">
      <div
        className={cn(
          "group cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500 w-72 aspect-[3/5]",
        )}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        // 💻 Desktop hover
      >
        <div className="text relative z-50 bg-gradient-to-t from-black/25 to-black/50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">{teamMember.name}</h1>
          <p className="font-normal text-base text-gray-50 relative my-4">{teamMember.role}</p>
        </div>
      </div>
    </div>
  );
};

const MeetTeam = () => {
  const { data } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => await axiosInstance.get<TeamMember[]>("/public/locales/en/team.json"),
  });

  const team: TeamMember[] = data?.data || [];

  return (
    <div className="bg-white">
      <div className="mx-auto 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl max-w-2xl my-20">
        <div className="text-6xl text-[#1b1b1b] leading-none font-serif font-extralight text-center">
          Group Executive Chefs
        </div>
        <p className="mx-auto text-center leading-relaxed max-w-5xl mt-4 mb-8 font-[Times_New_Roman] text-[#4a4949] text-base sm:text-lg md:text-xl">
          The team behind <span className="text-[#C19D60] font-semibold">VOLTO</span> brings
          together creative visionaries and hospitality experts united by a passion for elevated
          experiences. From bold culinary talent to immersive atmosphere designers, we craft a
          lounge and dining concept where flavor, ambiance, and service come together to leave a
          lasting impression.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mx-auto">
          {team
            .filter((member) => !member.isCeo)
            .map((member, index) => (
              <TeamMemberCard key={index} teamMember={member} />
            ))}
        </div>

        <div className="flex flex-col items-center mt-10">
          <div className="w-20 h-[2px] bg-[#C19D60] mb-3"></div>
          <p className="text-[#1b1b1b] font-[Times_New_Roman] italic text-center text-sm sm:text-base">
            At Volto, talent meets passion. Our team is the heartbeat of unforgettable nights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetTeam;
