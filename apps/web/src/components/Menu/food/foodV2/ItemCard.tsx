import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FoodItem } from "../foodData";
import { BookText, TriangleAlert, CircleDollarSign } from "lucide-react";

const ItemCard = ({
  item,
  onItemSelect,
}: {
  item: FoodItem | null;
  onItemSelect: (item: FoodItem | null) => void;
}) => {
  return (
    <Dialog open={item !== null} onOpenChange={() => onItemSelect(null)}>
      <DialogContent className=" p-0 lg:mt-0 rounded-xl max-h-[90vh] z-[1000]">
        {item && (
          <Card className=" p-0 m-0  max-w-2xl h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="flex flex-col h-fit p-0 m-0  ">
              <img
                src={item.src}
                alt={item.title}
                className=" w-full h-[32rem] lg:h-[32rem] rounded-t-xl  object-cover  "
              />
              <div className="px-0.5 sm:px-4 overflow-y-auto  max-h-[calc(90vh-32rem)] lg:max-h-[calc(90vh-32rem)] h-fit flex flex-col py-4  space-y-4 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
                <h2 className=" font-semibold font-['EB_Garamond'] uppercase text-gray-900 text-2xl  text-center  ">
                  {item.title}
                </h2>

                <div className=" flex flex-col items-center space-y-2 h-fit">
                  <span className=" font-['Cinzel']  text-gray-900 text-md pl-2 h-fit text-center tracking-tight leading-tight">
                    {item.description}
                  </span>
                  <span className="font-['Cinzel'] text-gray-900 text-2xl pl-2 h-fit text-center">
                    {item.price}
                  </span>
                  <div className="font-['Cinzel'] text-gray-900 text-md pl-2 h-fit space-x-1">
                    {item.allergiesList.map((allergy, index) => {
                      return index < item.allergiesList.length - 1 ? (
                        <>
                          <span key={allergy}>{allergy}</span>
                          <span key={index}>|</span>
                        </>
                      ) : (
                        <span key={allergy}>{allergy}</span>
                      );
                    })}
                  </div>

                  <div className=" w-fit mx-auto text-muted-foreground text-center text-xs lg:text-sm">
                    *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5%
                    Gov. Levy
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ItemCard;
