import { drinksCategory } from '@/data/menu/drinks'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/Item2'
import type { Item22 } from '@/types/items'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'



const MenuSection = ({ img, category, menuCardPostiion, menuTitle }: { img: string, category: Category, menuCardPostiion: 'right' | 'left', menuTitle: string }) => {


    function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
        const chunks: T[][] = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    }

    const isMobile = () => {

        return window && window.innerWidth < 768;
    };

    return (
        <>
            <div className="relative bg-fixed bg-cover bg-center min-h-screen  flex items-center justify-center "
                style={{ backgroundImage: `url(${img})`, }} >

                {/* Optional overlay */}
                <div className="absolute inset-0  bg-opacity-60 " />

                <div className={cn("relative z-10 h-full w-full flex   items-end", menuCardPostiion === 'right' ? 'justify-end' : ' justify-start')}>
                    <div className={cn("  w-full  md:w-6/12 h-screen  bg-white ")} >

                        <div className="mx-auto flex w-full h-full flex-col items-center justify-center bg-[#777777]/25 px-4">

                            <div className=" w-5/6">

                                {/* Section Header */}
                                <div className=" pb-4 ">
                                    <h2 className="text-4xl font-serif text-[#1b1b1b]">{category.title}</h2>
                                    {/* <div className="text-[#C19D60] text-base tracking-[3px] uppercase mb-2">
                                        VOLTO Wine Bar
                                    </div> */}
                                </div>


                                {/* Wine Menu Items */}
                                <div className="" dir='ltr'>
                                    <Carousel autoPlay stopOnHover swipeable showThumbs={false} showStatus={false} emulateTouch infiniteLoop interval={4000} className=' w-full  h-full'>

                                        {category.subCategory.map((SubCategoryList) => chunkArray(SubCategoryList.items, 5).map((group, groupIndex) => (

                                            <div key={groupIndex} className="space-y-8 select-none"> {/* Group container */}
                                                <div className="mb-12 space-y-2 ">
                                                    <div className="text-[#C19D60] text-base tracking-[3px] uppercase mb-2 text-start">
                                                        {SubCategoryList.title}
                                                    </div>
                                                </div>
                                                {group.map((wine, index) => (
                                                    <div key={index} className="flex gap-5 items-start">
                                                        {/* Wine Image */}
                                                        <div className="w-16 overflow-hidden rounded shrink-0">
                                                            <a href={wine.image} title={wine.title}>
                                                                <img
                                                                    src={wine.image}
                                                                    alt={wine.title}
                                                                    className="w-full h-full object-cover rounded-full"
                                                                />
                                                            </a>
                                                        </div>

                                                        {/* Text Content */}
                                                        <div className="flex-1">
                                                            <div className="flex flex-col items-start   md:flex-row  md:justify-between md:items-center  pb-1 mb-1 gap-3">
                                                                <span className=" text-xs md:text-lg  whitespace-nowrap font-semibold text-[#1b1b1b]">
                                                                    {wine.title}
                                                                </span>
                                                                <div className=' w-full h-2  border-b border-dotted border-gray-400 md:flex hidden ' />
                                                                <span className="text-[#C19D60] text-xs md:text-base md:font-medium whitespace-nowrap">{wine.price}</span>
                                                            </div>
                                                            <p className="italic  text-sm text-[#777] text-start">{wine.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className=' h-8' />
                                            </div>
                                        )))}

                                    </Carousel>

                                </div>

                            </div>

                        </div>




                    </div>
                </div>
            </div >

        </>
    )
}

export default MenuSection