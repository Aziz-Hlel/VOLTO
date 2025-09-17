import React from 'react'
import MenuBook from './MenuBook'

const Menu = () => {
    return (
        <>
            <div
                className="relative bg-fixed bg-cover bg-center min-h-screen  flex items-center justify-center"
                style={{ backgroundImage: "url('/img/banner8.jpg')" }}
            >
                {/* Optional overlay */}
                <div className="absolute inset-0  bg-opacity-60" />

                <div className="relative z-10 w-full">
                    <div className="max-w-[1140px] mx-auto px-4">
                        <div className="text-center mt-[60px]">
                            <h5 className="text-sm uppercase tracking-[7px] text-white mb-4 font-noah">Restaurant</h5>

                            <h1 className="text-white text-[70px] leading-none font-serif font-normal">
                                Menu Book
                                <span className="block text-[35px] text-[#C19D60] mt-2">Food & Wine</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <MenuBook />
        </>
    )
}

export default Menu