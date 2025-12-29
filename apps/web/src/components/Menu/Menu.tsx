import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MenuCarouselTypes } from "./MenuCarousel";

type ImenuCategories = {
  title: string;
  image: string;
  color: string;
  menuType: MenuCarouselTypes;
};
const menuCategories: ImenuCategories[] = [
  {
    title: "Signature Cocktails",
    image: "/img/menuWallpaper/cocktail_banner.jpeg",
    color: "transparent",
    menuType: "Cocktails",
  },
  {
    title: "Food",
    image: "/img/menuWallpaper/food_banner.jpeg",
    color: "transparent",
    menuType: "Food",
  },
  {
    title: "Shisha",
    image: "/img/menuWallpaper/shisha_banner.jpeg",
    color: "transparent",
    menuType: "Hookah",
  },
];

const Menu = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen text-white flex flex-col items-center justify-center overflow-hidden">
      {/* ✨ Background professionnel */}
      <div className="absolute inset-0 bg-[url('/img/banner-volto.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-neutral-900/90 to-black/95 backdrop-blur-[2px]"></div>
      <div className="absolute -top-20 left-0 w-[800px] h-[800px] bg-[#C19D60]/10 blur-[120px] rounded-full opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[150px] rounded-full opacity-30"></div>

      {/* Header */}
      <div className="relative w-full z-10 mt-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-snug text-white">
          Menu
        </h1>
      </div>

      {/* Horizontal cards */}
      <div className="flex flex-row justify-center gap-8 w-full max-w-7xl flex-wrap sm:flex-nowrap z-10 ">
        {menuCategories.map((item, index) => (
          <div
            key={index}
            className="relative hover:scale-110 duration-100 transition-transform w-full sm:w-[380px] h-[420px] rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer backdrop-blur-sm"
            onClick={() => navigate("/menu/" + item.menuType.toLocaleLowerCase())}
          >
            {/* Image */}
            <img        
              src={item.image}        
              alt={item.title}        
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"        
              onClick={() => navigate("/menu/" + item.menuType.toLocaleLowerCase())}        
            />

            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${item.color} to-black/80 transition-opacity duration-300`}
            />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-1">{item.title}</h2>
           
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
