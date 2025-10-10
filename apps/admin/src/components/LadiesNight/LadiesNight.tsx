import { useQuery } from "@tanstack/react-query";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import CountDown from "./CountDown";
import { Button } from "../ui/button";
import { Martini } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import UpdateDrinkQuota from "./UpdateDrinkQuota";
import { ChartAreaInteractive } from "./Chart/chart-area-interactive";
import { EventsDataTable } from "./LadiesNightDataTable";

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

  const handleOpenUpdateDrinkQuota = (open: boolean) => setOpenUpdateDrinkQuota(open);

  return (
    <div>
      {openUpdateDrinkQuota && (
        <UpdateDrinkQuota
          open={openUpdateDrinkQuota}
          setOpen={handleOpenUpdateDrinkQuota}
          initialDrinkQuota={drinkQuota ?? 0}
        />
      )}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ladies Night Dashboard</h1>
            <p className="text-muted-foreground">Welcome back</p>
          </div>
          <CountDown ladiesNight={ladiesNight} isFetched={ladiesNightDataIsFetched} />
        </div>
      </header>

      <main className="p-6">
        <div className=" w-full flex justify-end">
          <Button
            variant="default"
            className=" flex"
            onClick={() => handleOpenUpdateDrinkQuota(true)}
          >
            <div className="h-full flex justify-center items-center space-x-1">
              <span className="w-full ">Drink Quota : </span>
              {quotaDataIsFetched ? <span>{drinkQuota}</span> : <Spinner />}
              <Martini className=" size-3  font-semibold" />
            </div>
          </Button>
        </div>

        <div className=" w-full grid grid-cols-5 gap-4">
          <div className=" col-span-3">
            <EventsDataTable data={ []} />
            {/* <EventsDataTable data={ladiesNight?.events ?? []} /> */}
          </div>
          <div className=" col-span-2">
            <ChartAreaInteractive />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LadiesNight;
