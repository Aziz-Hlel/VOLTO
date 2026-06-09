import { foodCategories } from "@/data/menu/foodV2/category";
import { type EmblaViewportRefType } from "embla-carousel-react";
import { useMemo } from "react";
import { foodData, type FoodItem } from "@/data/menu/foodV2/food";
import FoodDisplay from "./FoodDisplay";
import type { CategoriesSelection } from "./FoodV2";

const FoodCarousel = ({
  emblaRef,
  setSelectedItem,
  onCategorySelect,
}: {
  emblaRef: EmblaViewportRefType;
  setSelectedItem: (item: FoodItem) => void;
  onCategorySelect: (category: CategoriesSelection) => void;
}) => {
  const foodSlideData = useMemo(() => {
    return [
      foodData,
      ...Object.keys(foodCategories).map((foodCategory) =>
        foodData.filter((foodItem) => foodItem.category === foodCategory),
      ),
    ];
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {foodSlideData.map((items, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
              <div className="h-full overflow-y-auto pb-24 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
                <div className="p-6">
                  <FoodDisplay selectedFood={items} onItemSelect={setSelectedItem} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCarousel;
