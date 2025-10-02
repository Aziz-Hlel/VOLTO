import mainsMenuItems from "@/data/menu/mainsMenu";
import MenuSection from "./MenuSection";
import wineItems from "@/data/menu/wineItems";
import type { Item22 } from "@/types/items";
import startesItems from "@/data/menu/startesItems";
import { hookahMenuItems } from "@/data/menu/hookahMenuItems";
import { drinksCategory } from "@/data/menu/drinks";
import { foodCategory } from "@/data/menu/food";
import { hookahsCategory } from "@/data/menu/hookahs";
import { vegansCategory } from "@/data/menu/vegans";
import { HoverExpand_002, Skiper53 } from "./MenuMobile";

const Menu = () => {
  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <>
      <div>
        <div
          className="relative bg-fixed bg-cover bg-center min-h-screen  flex items-center justify-center"
          style={{ backgroundImage: "url('/img/banner12.jpg')" }}
        >
          {/* Optional overlay */}
          <div className="absolute inset-0  bg-opacity-60 bg-black/25" />

          <div className="relative z-10 w-full">
            <div className="max-w-[1140px] mx-auto px-4">
              <div className="text-center mt-[60px]">
                <h5 className="text-sm uppercase tracking-[7px] text-white mb-4 font-noah">
                  Restaurant
                </h5>

                <h1 className="text-white text-[70px] leading-none font-serif font-normal">
                  Menu Book
                  <span className="block text-[35px] text-[#C19D60] mt-2">Food & Wine</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* <Skiper53  /> */}
        <MenuSection
          img={"/img/menuWallpaper/cocktail.png"}
          category={drinksCategory}
          menuCardPostiion="right"
          menuTitle="VOLTO Special Cocktails"
        />
        <MenuSection
          img={"/img/menuWallpaper/banner8.inverted.jpg"}
          category={foodCategory}
          menuCardPostiion="left"
          menuTitle="VOLTO Drink Bar"
        />
        <MenuSection
          img={"/img/menuWallpaper/2.jpg"}
          category={vegansCategory}
          menuCardPostiion="right"
          menuTitle="VOLTO Food Cuisine"
        />
        <MenuSection
          img={"/img/menuWallpaper/hooka3.jpg"}
          category={hookahsCategory}
          menuCardPostiion="left"
          menuTitle="VOLTO Hookah"
        />

        {/* <MenuSection img={"/img/banner5.jpg"} items={mainsMenuItems} /> */}

        <div
          className="relative bg-fixed bg-cover bg-center min-h-screen  flex items-center justify-center"
          style={{ backgroundImage: "url('/img/banner7.jpg')" }}
        >
          {/* Optional overlay */}
          <div className="absolute inset-0  bg-opacity-60" />

          <div className="relative z-10 w-full">
            <div className="max-w-[1140px] mx-auto px-4">
              <div className="text-center mt-[60px]">
                <h5 className="text-sm uppercase tracking-[7px] text-white mb-4 font-noah">
                  Restaurant
                </h5>

                <h1 className="text-white text-[70px] leading-none font-serif font-normal">
                  Menu Book
                  <span className="block text-[35px] text-[#C19D60] mt-2">Food & Wine</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
