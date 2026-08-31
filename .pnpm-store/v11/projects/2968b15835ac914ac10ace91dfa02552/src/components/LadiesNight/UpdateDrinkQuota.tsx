import React, { useState, type FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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

  const { mutateAsync } = useMutation({
    mutationFn: (quota: number) => ladiesNightService.updateQuota(quota),
  });

  const handleDrinkQuotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) >= 0) setDrinkQuota(Number(event.target.value));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await mutateAsync(drinkQuota);
      await queryClient.refetchQueries({ queryKey: ["ladies-night", "quota"], exact: true });
      setLoading(false);
      setOpen(false);
      toast.success("Drink quota updated successfully 🍸");
    } catch (error) {
      setLoading(false);
      toast.error(error?.error ?? "Error updating drink quota");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl shadow-xl border border-gray-200 p-6 transition-all duration-300">
          <DialogHeader className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <Martini className="w-6 h-6 text-pink-500 animate-pulse" />
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Edit Drink Quota
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-500 text-sm">
              Adjust the number of free drinks available for ladies night.
            </DialogDescription>
          </DialogHeader>

          {/* Input Section */}
          <div className="flex items-center justify-center my-6">
            <InputGroup className="w-32 border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-pink-400">
              <InputGroupInput
                placeholder="3"
                type="number"
                value={drinkQuota}
                onChange={handleDrinkQuotaChange}
                className="text-center font-semibold text-gray-700"
              />
              <InputGroupAddon align="inline-end">
                <div className="bg-pink-500 text-white flex items-center justify-center size-6 rounded-full">
                  <Martini className="size-4" />
                </div>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="flex justify-end space-x-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={handleFormSubmit}
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white shadow-md transition-transform hover:scale-105"
            >
              {loading ? <Spinner /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpdateDrinkQuota;
