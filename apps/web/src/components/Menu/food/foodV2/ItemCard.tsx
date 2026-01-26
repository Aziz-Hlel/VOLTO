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
      <DialogContent className=" p-0 mt-8 lg:mt-0 rounded-xl max-h-[90vh] z-[1000]">
        {item && (
          <Card className=" p-0 m-0  max-w-2xl h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="flex flex-col h-full p-0 m-0 ">
              <img
                src={item.src}
                alt={item.title}
                className=" w-full h-[28rem] lg:h-[32rem] rounded-t-xl  object-cover  "
              />
              <div className="px-4 overflow-y-auto  h-[calc(90vh-28rem)] lg:max-h-[calc(90vh-32rem)]">
                <h2 className=" text-yellow-500 text-2xl font-bold mt-4 text-center">
                  {item.title}
                </h2>
                <div className=" flex flex-col space-y-4 h-fit">
                  <div>
                    <div>
                      <BookText className=" inline-block size-4 mr-2 mb-1 text-blue-500 " />
                      <span className=" text-blue-500 font-semibold">Ingredients :</span>
                    </div>
                    <span className=" text-black/80 text-md pl-2 h-fit">{item.description}</span>
                  </div>
                  <div>
                    <div>
                      <TriangleAlert className=" inline-block size-4 mr-2 mb-1 text-red-500 " />
                      <span className=" text-red-500 font-semibold">Allergies :</span>
                    </div>
                    <span className=" text-black/80 text-md pl-2 h-fit">{item.allergies_long}</span>
                  </div>
                  <div>
                    <div>
                      <CircleDollarSign className=" inline-block size-4 mr-2 mb-1 text-amber-500 " />
                      <span className=" text-amber-500 font-semibold">Price :</span>
                    </div>
                    <span className=" text-black/80 text-md pl-2 h-fit">{item.price}</span>
                  </div>
                  <div className=" w-fit mx-auto text-muted-foreground text-center text-xs lg:text-sm">
                    *All Prices Are In Bahraini Dinars & Subject To 10% Service Charge, 10% Vat & 5%
                    Gov. Levy
                  </div>{" "}
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
