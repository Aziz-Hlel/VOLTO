import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import type { LadiesNightStatsPeriod } from "@/types/ladiesNight/GetLadiesNightByPeriodDto";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ChartWrapper = () => {
  const [period, setPeriod] = useState<LadiesNightStatsPeriod>("90d");

  const { data, isFetched } = useQuery({
    queryKey: ["ladies-night", "period"],
    queryFn: async () => await ladiesNightService.statsByPeriod({ period }),
    enabled: true,
  });

  return <div>ChartWrapper</div>;
};

export default ChartWrapper;
