import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import type { GetLadiesNightDataQueryDto } from "@/types/ladiesNight/GetLadiesNightDataQueryDto";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Spinner } from "../ui/spinner";
import { EventsDataTable } from "./EventsDataTable";
import { SpinningWheelService } from "@/Api/services/SpinningWheel.service";

const SpinningWheelDataTableWrapper = () => {
  const [query, setQuery] = useState<GetLadiesNightDataQueryDto>({ limit: 7, page: 1 });

  const { data: spinningWheelData, isFetched: ladiesNightStatsIsFetched } = useQuery({
    queryKey: ["spinning-wheel", "stats", query],
    queryFn: async () => await SpinningWheelService.stats(query),
    enabled: true,
  });

  const spinningWheelStats = spinningWheelData?.data.spinningWheelStats;
  const count = spinningWheelData?.data.count;

  const handleQueryChange = (newQuery: GetLadiesNightDataQueryDto) => setQuery(newQuery);

  if (!ladiesNightStatsIsFetched) return <Spinner />;

  if (ladiesNightStatsIsFetched && spinningWheelStats)
    return (
      <EventsDataTable
        data={spinningWheelStats}
        count={count}
        query={query}
        setQuery={handleQueryChange}
      />
    );
};

export default SpinningWheelDataTableWrapper;
