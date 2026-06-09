import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import type { FoodItem } from "@/data/menu/foodV2/food";

const ItemCard = ({
  item,
  onItemSelect,
}: {
  item: FoodItem | null;
  onItemSelect: (item: FoodItem | null) => void;
}) => {
  return (
    <Dialog open={item !== null} onOpenChange={() => onItemSelect(null)}>
      <DialogContent className=" p-0 lg:mt-0 rounded-xl max-h-[90dvh] z-[1000]">
        {item && (
          <Card className=" p-0 m-0  max-w-2xl h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="flex flex-col h-fit p-0 m-0  ">
              <img
                src={item.src}
                alt={item.title}
                className=" w-full h-[65dvh] rounded-t-xl  object-cover  "
              />
              <div className="px-0.5 sm:px-4 overflow-y-auto max-h-[25dvh] h-fit flex flex-col py-4  space-y-2 overscroll-contain scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent hover:scrollbar-thumb-neutral-400">
                <DialogTitle className="font-semibold font-['EB_Garamond'] uppercase text-gray-900 text-2xl  text-center">
                  {item.title}
                </DialogTitle>
                <div className=" flex flex-col items-center space-y-2 h-fit">
                  <DialogDescription className="font-['Cinzel'] text-gray-900 text-md pl-2 h-fit text-center tracking-tight leading-tight whitespace-pre-line">
                    {item.description}
                  </DialogDescription>
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
