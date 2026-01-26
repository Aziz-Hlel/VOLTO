import { Button } from "@/components/ui/button";
import React from "react";
import type { CategoriesSelection } from "./FoodV2";
import { cn } from "@/lib/utils";

const CategoryTab = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: {
  categories: CategoriesSelection[];
  selectedCategory: CategoriesSelection;
  onCategorySelect: (category: CategoriesSelection) => void;
}) => {
  return (
    <div className=" flex items-center gap-4 w-full overflow-x-auto py-4">
      {categories.map((category) => (
        <Button
          key={category}
          className={cn(
            "cursor-pointer text-white border ",
            selectedCategory === category && "border-amber-400 text-amber-400 ",
          )}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTab;
