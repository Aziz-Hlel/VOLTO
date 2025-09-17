import type { FC } from 'react';
import { AspectRatio } from '../ui/aspect-ratio'
import type { cheffListProps } from '../Home/ChefRecommendation';




const ChefRecommendationItem: FC<{ props: cheffListProps }> = ({ props }) => {

    const Icon = props.icon;
    return (
        <>
            <div className="relative overflow-hidden mb-6 group hover:cursor-default">
                <div className="relative overflow-hidden ">
                    <AspectRatio ratio={7 / 9} className=''>
                        <img src={props.img} alt="" className="transition h-full duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-75" />
                    </AspectRatio>
                </div>
                {/* <span className="absolute top-6 left-6 bg-[#C19D60] text-white text-[12px] w-10 h-10 flex items-center justify-center transform -rotate-12 z-10">NEW</span> */}
                <div className="absolute bottom-0 left-0 w-full text-center p-6 bg-gradient-to-b from-transparent via-black/75 to-black/50 transition-all duration-300">
                    <div className="text-white text-[30px] mb-4 w-full flex justify-center">
                        <Icon />
                    </div>
                    <h6 className="text-[#C19D60] text-[12px] uppercase tracking-[3px] mb-2">{props.category}</h6>
                    <h5 className="text-white text-[27px] mb-4">{props.name}</h5>
                    <div className="h-[1px] w-16 bg-white mx-auto mb-6 group-hover:w-full transition-all duration-500"></div>
                    <p className="italic text-white text-[15px]">{props.description}</p>
                </div>
            </div>
        </>
    )
}

export default ChefRecommendationItem