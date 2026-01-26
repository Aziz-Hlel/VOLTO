import { Button } from "@/components/ui/button";
import { foodCategories, foodData, type CategoriesName, type FoodItem } from "../foodData";
import { useEffect, useState } from "react";
import HsanBackground from "@/utils/HsanBackground";
import CategoryTab from "./CategoryTabsComp";
import FoodDisplay from "./FoodDisplay";
import ItemCard from "./ItemCard";

export type CategoriesSelection = CategoriesName | "All";

const FoodV2 = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoriesSelection>("All");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const categories: CategoriesSelection[] = [
    "All",
    ...(Object.keys(foodCategories) as CategoriesName[]),
  ];
  const selectedFood =
    selectedCategory === "All"
      ? foodData
      : foodData.filter((item) => item.category === selectedCategory);

  const onCategorySelect = (category: CategoriesSelection) => {
    setSelectedCategory(category);
  };

  const onItemSelect = (item: FoodItem | null) => {
    setSelectedItem(item);
  };

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
        <div className=" h-full overflow-y-auto pb-24 overscroll-contain scroll-smooth  scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
          <FoodDisplay selectedFood={selectedFood} onItemSelect={onItemSelect} />
        </div>
      </div>
      <ItemCard item={selectedItem} onItemSelect={onItemSelect} />
    </div>
  );
};

export default FoodV2;
