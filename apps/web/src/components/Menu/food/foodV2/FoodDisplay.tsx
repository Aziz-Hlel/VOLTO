import { Button } from "@/components/ui/button";
import React from "react";
import type { FoodItem } from "../foodData";

const FoodDisplay = ({
  selectedFood,
  onItemSelect,
}: {
  selectedFood: FoodItem[];
  onItemSelect: (item: FoodItem) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4  ">
      {selectedFood.map((item, index) => (
        <div
          key={index}
          className="mb-8 p-4 min-h-44 flex gap-4 bg-white/10 hover:bg-white/20 rounded-lg shadow-lg backdrop-blur-md border border-white/20 cursor-pointer"
          onClick={() => onItemSelect(item)}
        >
          <div className=" w-32 h-full shrink-0">
            <img src={item.src} alt={item.title} className=" object-fill w-full h-44" />
          </div>
          <div className="flex flex-col w-full ">
            <h2 className="text-lg font-bold mb-2 text-white">{item.title}</h2>
            <p className="text-white/80 text-md line-clamp-2">{item.description}</p>
            <p className="text-yellow-400 font-semibold mt-2">{item.price}</p>

            <div className=" flex-1 w-full h-full flex items-end justify-end">
              <Button className=" bg-amber-400 hover:bg-amber-300 text-black">View Details</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDisplay;
