import { foodCategories } from "@/data/menu/foodV2/category";
import HorizontalCategorySkipper from "./HorizontalCategorySkipper";
import CategorySkipper from "./VerticalCategorySkipper";

export default function CategoryDisplay() {
  const foodArray = Object.values(foodCategories).sort((a, b) => a.sortOrder - b.sortOrder);
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
      <CategorySkipper className=" block md:hidden" images={foodArray} />
      <HorizontalCategorySkipper className=" hidden md:block" images={foodArray} />
    </div>
  );
}
