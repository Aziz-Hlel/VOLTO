import { useQuery } from "@tanstack/react-query";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import CountDown from "./CountDown";
import { Button } from "../ui/button";
import { Martini } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import UpdateDrinkQuota from "./UpdateDrinkQuota";
import { ChartAreaInteractive } from "./Chart/chart-area-interactive";
import LadiesNightDataTableWrapper from "./LadiesNightDataTableWrapper";

const LadiesNight = () => {
  const { data: ladiesNightData, isFetched: ladiesNightDataIsFetched } = useQuery({
    queryKey: ["ladies-night", "details"],
    queryFn: async () => await ladiesNightService.details(),
    enabled: true,
  });

  const { data: quotaData, isFetched: quotaDataIsFetched } = useQuery({
    queryKey: ["ladies-night", "quota"],
    queryFn: async () => await ladiesNightService.getQuota(),
    enabled: true,
  });

  const ladiesNight = ladiesNightData?.data;
  const drinkQuota = quotaData?.data.quota ?? undefined;
  const [openUpdateDrinkQuota, setOpenUpdateDrinkQuota] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50 p-4 sm:p-6 lg:p-10 space-y-6">
      {/* Update Drink Quota Modal */}
      {openUpdateDrinkQuota && (
        <UpdateDrinkQuota
          open={openUpdateDrinkQuota}
          setOpen={setOpenUpdateDrinkQuota}
          initialDrinkQuota={drinkQuota!}
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 shadow-lg text-white border border-purple-300">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">💃 Ladies Night Dashboard</h1>
          <p className="text-sm sm:text-base mt-1 text-purple-100">Welcome back VIP</p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-15">
          <CountDown ladiesNight={ladiesNight} isFetched={ladiesNightDataIsFetched} />
          <Button
            variant="default"
            onClick={() => setOpenUpdateDrinkQuota(true)}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            {quotaDataIsFetched ? (
              <>
                <span>Drink Quota: {drinkQuota}</span>
                <Martini className="w-5 h-5" />
              </>
            ) : (
              <Spinner />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {/* Tableau - Carte spéciale */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-200 p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[320px]">
            <LadiesNightDataTableWrapper />
          </div>
        </div>

        {/* Graphique - Carte spéciale */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-200 p-4 sm:p-6">
          <ChartAreaInteractive />
        </div>
      </main>
    </div>
  );
};

export default LadiesNight;
