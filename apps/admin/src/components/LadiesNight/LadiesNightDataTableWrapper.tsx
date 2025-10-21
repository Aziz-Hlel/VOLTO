import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import type { GetLadiesNightDataQueryDto } from "@/types/ladiesNight/GetLadiesNightDataQueryDto";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { EventsDataTable } from "./EventsDataTable";
import { Spinner } from "../ui/spinner";

const LadiesNightDataTableWrapper = () => {
  const [query, setQuery] = useState<GetLadiesNightDataQueryDto>({ limit: 7, page: 1 });
  const { data: ladiesNightData, isFetched: ladiesNightStatsIsFetched } = useQuery({
    queryKey: ["ladies-night", "stats", query],
    queryFn: async () => await ladiesNightService.stats(query),
    enabled: true,
  });

  const ladiesNightStats = ladiesNightData?.data.ladiesNightStats;
  const count = ladiesNightData?.data.count;

  const handleQueryChange = (newQuery: GetLadiesNightDataQueryDto) => setQuery(newQuery);

  if (!ladiesNightStatsIsFetched) return <Spinner />;

  if (ladiesNightStatsIsFetched && ladiesNightStats)
    return (
      <EventsDataTable
        data={ladiesNightStats}
        count={count}
        query={query}
        setQuery={handleQueryChange}
      />
    );
};

export default LadiesNightDataTableWrapper;
