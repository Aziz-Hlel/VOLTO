import team from '@/data/team';
import { cn } from '@/lib/utils';
import type { TeamMember } from '@/types/teamMember';
import { useState } from 'react';




const TeamMemberCard = ({ teamMember }: { teamMember: TeamMember }) => {

    const gif = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif"

    const [bgImage, setBgImage] = useState(teamMember.media.imageUrl);


    return (
        <div className="">
            <div
                className={cn(
                    "group  cursor-pointer overflow-hidden relative card  rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
                    // Preload hover image by setting it in a pseudo-element
                    // "before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
                    // "hover:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif)]",
                    "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
                    "transition-all duration-500  w-72 aspect-[9/16] "
                )}
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onMouseEnter={() =>
                    setBgImage(teamMember.media.gifUrl !== "" ? teamMember.media.gifUrl : gif)
                }
                onMouseLeave={() => setBgImage(teamMember.media.imageUrl)}

            >


                <div className="text relative z-50  bg-gradient-to-t from-black/25 to-black/50 ">
                    <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
                        {teamMember.name}
                    </h1>
                    <p className="font-normal text-base text-gray-50 relative my-4">
                        {teamMember.position}
                    </p>
                </div>
            </div>
        </div>
    );
};




const MeetTeam = () => {

    return (
        <>
            <div className='bg-white'>

                <div className='mx-auto 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl max-w-2xl my-20'>

                    <div className=' mx-auto w-fit text-5xl font-semibold md:text-6xl text-center'> Meet Our Team</div>
                    <div className='mx-auto text-center leading-relaxed w-fit text-md mt-4 mb-8'>
                        The team behind VOLTO brings together creative visionaries and hospitality experts united by a passion for elevated experiences.
                        From bold culinary talent to immersive atmosphere designers, we craft a lounge and dining concept where flavor, ambiance,
                        and service come together to leave a lasting impression.
                    </div>

                    <div className='flex flex-wrap justify-center  gap-8 mx-auto'>

                        {team.map((member, index) => (
                            <TeamMemberCard teamMember={member} />
                        ))}

                    </div>

                </div>
            </div>

        </>
    )


}

export default MeetTeam