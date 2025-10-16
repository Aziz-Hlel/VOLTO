import { useQuery } from "@tanstack/react-query";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import { Button } from "../ui/button";
import { Martini } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { SpinningWheelService } from "@/Api/services/SpinningWheel.service";
import CountDown from "./CountDown";
import UpdateSpinningWheel from "./UpdateSpinningWheel";
import SpinningWheelDataTableWrapper from "./SpinningWheelDataTableWrapper";
import { ChartAreaInteractive } from "./Chart/chart-area-interactive";

const SpinningWheel = () => {
  const { data: spinningWheelData, isFetched: spinningWheelIsFetched } = useQuery({
    queryKey: ["spinning-wheel", "details"],
    queryFn: async () => await SpinningWheelService.details(),
    enabled: true,
  });

  const { data: quotaData, isFetched: quotaDataIsFetched } = useQuery({
    queryKey: ["spinning-wheel", "quota"],
    queryFn: async () => await ladiesNightService.getQuota(),
    enabled: true,
  });

  const spinningWheel = spinningWheelData?.data;

  const drinkQuota = quotaData?.data.quota ?? undefined;

  const [openUpdateSpinningWheel, setOpenUpdateSpinningWheel] = useState(false);

  const handleOpenUpdateDrinkQuota = (open: boolean) => setOpenUpdateSpinningWheel(open);

  if (!spinningWheelIsFetched || !quotaDataIsFetched) return <Spinner />;

  return (
    <div>
      {openUpdateSpinningWheel && (
        <UpdateSpinningWheel
          open={openUpdateSpinningWheel}
          setOpen={handleOpenUpdateDrinkQuota}
          initialSpinningWheel={spinningWheel!}
        />
      )}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Spinning Wheel Dashboard</h1>
            <p className="text-muted-foreground">Welcome back</p>
          </div>
          <CountDown spinningWheel={spinningWheel} isFetched={spinningWheelIsFetched} />
        </div>
      </header>

      <main className="p-6 flex flex-col gap-y-4">
        <div className=" w-full flex justify-end">
          <Button
            variant="default"
            className=" flex"
            onClick={() => handleOpenUpdateDrinkQuota(true)}
          >
            <div className="h-full flex justify-center items-center space-x-1">
              <span className="w-full ">Edit Spinning Wheel</span>
            </div>
          </Button>
        </div>

        <div className=" w-full grid grid-cols-5 gap-4">
          <div className=" col-span-3"><SpinningWheelDataTableWrapper /></div>
          <div className=" col-span-2"><ChartAreaInteractive /></div>
        </div>
      </main>
    </div>
  );
};

export default SpinningWheel;
