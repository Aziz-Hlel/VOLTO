import React, { useState, type FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Martini } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import { toast } from "sonner";

interface UpdateDrinkQuotaProps {
  initialDrinkQuota: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateDrinkQuota: FC<UpdateDrinkQuotaProps> = ({ initialDrinkQuota, open, setOpen }) => {
  const [drinkQuota, setDrinkQuota] = useState(initialDrinkQuota);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDrinkQuotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= 0) setDrinkQuota(Number(event.target.value));
  };

  const handleFormSubmit =async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try{
      setLoading(true);
     const response = await ladiesNightService.updateQuota(drinkQuota);
     await queryClient.invalidateQueries({ queryKey: ["ladiesNight"], exact: false });

      setLoading(false);
      setOpen(false);
      toast.success("Drink quota updated successfully");
      queryClient.invalidateQueries({ queryKey: ["ladiesNight"], exact: false });
    }catch(error){
      setLoading(false);
      toast.error("Error updating drink quota");
    }

  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="[&_button.absolute.right-4.top-4]:hidden sm:max-w-[425px] grid grid-cols-4 grid-rows-2 p-5">
            <DialogHeader className=" col-span-3 row-span-1">
              <DialogTitle>Edit Drink Quota </DialogTitle>
              <DialogDescription>Click save when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className=" col-span-1 row-span-1 flex items-center justify-center ">
              <InputGroup className="w-24">
                <InputGroupInput
                  placeholder="3"
                  type="number"
                  value={drinkQuota}
                  onChange={handleDrinkQuotaChange}
                />
                <InputGroupAddon align="inline-end">
                  <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                    <Martini className="size-3" />
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <DialogFooter className=" col-span-4 row-span-1">
              <DialogClose asChild>
                <Button className="" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} onClick={handleFormSubmit} type="submit" className="enabled:cursor-pointer">{loading ? <Spinner /> : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateDrinkQuota;
