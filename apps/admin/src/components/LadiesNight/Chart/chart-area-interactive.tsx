"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import type { LadiesNightStatsPeriod } from "@/types/ladiesNight/GetLadiesNightByPeriodDto";
import { useQuery } from "@tanstack/react-query";
import type { LadiesNightStatsResponse } from "@/types/ladiesNight/LadiesNightStatsResponse";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  totalParticipants: {
    label: "Total Participants",
    color: "var(--chart-1)",
  },
  participantWithAllRedeemedDrinks: {
    label: "Participants With All Redeemed Drinks",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [period, setPeriod] = React.useState<LadiesNightStatsPeriod>("365d");
  const handlePeriodChange = (value: LadiesNightStatsPeriod) =>
    setPeriod(value as LadiesNightStatsPeriod);

  const { data, } = useQuery({
    queryKey: ["ladies-night", "period", period],
    queryFn: async () => await ladiesNightService.statsByPeriod({ period }),
    enabled: true,
  });

  const chartData: LadiesNightStatsResponse[] | undefined = data?.data ?? undefined;

  const filteredData =
    data?.data.map((item) => ({
      date: item.startDate,
      totalParticipants: item.totalParticipants,
      participantWithAllRedeemedDrinks: item.participantWithAllRedeemedDrinks,
    })) ?? undefined;

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the
            <span>
              {" "}
              {period === "90d" && "last 3 months"}
              {period === "180d" && "last 6 months"}
              {period === "365d" && "last year"}
            </span>
          </CardDescription>
        </div>
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="365d" className="rounded-lg">
              Last year
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 aspect-auto w-full min-h-[250px]">
        {!chartData && <Spinner />}
        {chartData && (
          <ChartContainer config={chartConfig} className="aspect-auto  h-[250px]  w-full">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="filltotalParticipants" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-totalParticipants)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-totalParticipants)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="fillparticipantWithAllRedeemedDrinks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-participantWithAllRedeemedDrinks)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-participantWithAllRedeemedDrinks)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="participantWithAllRedeemedDrinks"
                type="natural"
                fill="url(#fillparticipantWithAllRedeemedDrinks)"
                stroke="var(--color-participantWithAllRedeemedDrinks)"
                stackId="a"
              />
              <Area
                dataKey="totalParticipants"
                type="natural"
                fill="url(#filltotalParticipants)"
                stroke="var(--color-totalParticipants)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent payload={undefined} />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
