import path from "path";
import CategorySkipper from "./VerticalCategorySkipper";
import HorizontalCategorySkipper from "./HorizontalCategorySkipper";

export default function CategoryDisplay() {
  const images = [
    {
      src: "/img/menu/food_menu/volto_nuts.jpeg",
      alt: "VOLTO NUTS",
      category: "Snacks",
      path: "snacks",
    },
    {
      src: "/img/menu/food_menu/fin_de_claire_oysters_dozen.jpeg",
      alt: "FIN DE CLAIRE OYSTERS DOZEN",
      category: "Oysters",
      path: "oysters",
    },
    {
      src: "/img/menu/food_menu/oscietra_caviar.jpeg",
      alt: "OSCIETRA CAVIAR",
      category: "Caviar Service",
      path: "caviar-service",
    },
    {
      src: "/img/menu/food_menu/volto_wagyu_sandwich.jpeg",
      alt: "VOLTO WAGYU SANDWICH",
      category: "Appetizers",
      path: "appetizers",
    },
    {
      src: "/img/menu/food_menu/california.jpeg",
      alt: "CRAZY SUSHI CALIFORNIA",
      category: "Sushi",
      path: "sushi",
    },
    {
      src: "/img/menu/food_menu/beef_orzo.jpeg",
      alt: "BEEF ORZO",
      category: "Pasta",
      path: "pasta",
    },
    {
      src: "/img/menu/food_menu/rib_eye.jpeg",
      alt: "RIB EYE",
      category: "Grill",
      path: "grill",
    },
    {
      src: "/img/menu/food_menu/fruit_platter.jpeg",
      alt: "FRUIT PLATTER",
      category: "Dessert",
      path: "dessert",
    },
  ];

  return (
    <div className="flex flex-col pt-20 gap-4 h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#313131] via-[#1a1a1a] to-[#111] bottom-0">
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20 pointer-events-none mix-blend-soft-light" />

      {/* GOLD PARTICLES */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4AF37]"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.4 + 0.1,
                filter: "blur(1px)",
                animation: `floatGold ${Math.random() * 6 + 4}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#d4af37]/20 blur-3xl"
              style={{
                width: Math.random() * 200 + 120 + "px",
                height: Math.random() * 200 + 120 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `pulseGold ${Math.random() * 4 + 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <CategorySkipper className=" block md:hidden" images={images} />
      <HorizontalCategorySkipper className=" hidden md:block" images={images} />
    </div>
  );
}
