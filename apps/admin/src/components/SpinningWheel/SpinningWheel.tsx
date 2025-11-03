import { useQuery } from "@tanstack/react-query";
import { SpinningWheelService } from "@/Api/services/SpinningWheel.service";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import CountDown from "./CountDown";
import UpdateSpinningWheel from "./UpdateSpinningWheel";
import SpinningWheelDataTableWrapper from "./SpinningWheelDataTableWrapper";
import { ChartAreaInteractive2 } from "./Chart2/chart-area-interactive2";

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

  const handleOpenUpdate = (open: boolean) => setOpenUpdateSpinningWheel(open);

  if (!spinningWheelIsFetched || !quotaDataIsFetched) return <Spinner />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 p-6 space-y-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            🎡 Spinning Wheel Dashboard
          </h1>
          <p className="text-sm sm:text-base mt-1 text-purple-100">
            Manage your spinning wheels effectively
          </p>
        </div>
        <CountDown spinningWheel={spinningWheel} isFetched={spinningWheelIsFetched} />
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6">
        {/* Edit Button */}
        <div className="flex justify-end">
          <Button
            variant="default"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all"
            onClick={() => handleOpenUpdate(true)}
          >
            Edit Spinning Wheel
          </Button>
        </div>

        {/* Tableau complet */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 overflow-x-auto w-full">
          <SpinningWheelDataTableWrapper />
        </div>

        {/* Chronogramme en dessous */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 w-full">
          <ChartAreaInteractive2 />
        </div>
      </main>

      {/* Update Dialog */}
      {openUpdateSpinningWheel && (
        <UpdateSpinningWheel
          open={openUpdateSpinningWheel}
          setOpen={handleOpenUpdate}
          initialSpinningWheel={spinningWheel!}
        />
      )}
    </div>
  );
};

export default SpinningWheel;
