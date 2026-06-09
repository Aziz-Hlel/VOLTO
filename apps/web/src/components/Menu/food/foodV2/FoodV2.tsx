import { foodCategories, type CategoriesName } from "@/data/menu/foodV2/category";
import HsanBackground from "@/utils/HsanBackground";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { type FoodItem } from "../../../../data/menu/foodV2/food";
import CategoryTab from "./CategoryTabsComp";
import FoodCarousel from "./FoodCarousel";
import ItemCard from "./ItemCard";

export type CategoriesSelection = CategoriesName | "ALL";

const FoodV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoriesSelection>("ALL");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const categories: CategoriesSelection[] = [
    "ALL",
    ...(Object.keys(foodCategories) as CategoriesName[]),
  ];

  const onCategorySelect = (category: CategoriesSelection) => {
    setSelectedCategory(category);
    const index = categories.indexOf(category);
    ScrollTo(index);
  };

  const onItemSelect = (item: FoodItem | null) => {
    setSelectedItem(item);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const ScrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
    emblaApi.slidesInView();
  };

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      const nextCategory = categories[index];

      setSelectedCategory((prev) => (prev === nextCategory ? prev : nextCategory));
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, categories, setSelectedCategory]);

  return (
    <div className="flex flex-col pt-20 gap-4 h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#313131] via-[#1a1a1a] to-[#111] bottom-0">
      <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20 pointer-events-none mix-blend-soft-light" />

      <HsanBackground />

      <div className="h-screen w-full pt-4 md:pt-16 space-y-4 px-4 overflow-hidden">
        <CategoryTab
          categories={categories}
          onCategorySelect={onCategorySelect}
          selectedCategory={selectedCategory}
        />
        <div className=" h-full ">
          <FoodCarousel
            emblaRef={emblaRef}
            setSelectedItem={onItemSelect}
            onCategorySelect={onCategorySelect}
          />
        </div>
      </div>
      <ItemCard item={selectedItem} onItemSelect={onItemSelect} />
    </div>
  );
};

export default FoodV2;
