"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Area, AreaChart, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tooltip } from "@/components/ui/tooltip";

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
  const [period, setPeriod] = React.useState<LadiesNightStatsPeriod>("90d");
  const handlePeriodChange = (value: LadiesNightStatsPeriod) =>
    setPeriod(value as LadiesNightStatsPeriod);

  const { data } = useQuery({
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

  const dataMax =
    filteredData && filteredData.length
      ? Math.max(...filteredData.map((d) => d.totalParticipants ?? 0))
      : 0;

  const yAxisMax = Math.ceil((dataMax || 1) * 1.2); // 1.8 = 180% of dataMax; increase to make bars shorter

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
          <BarChart
            data={filteredData}
            width={1000}
            height={300}
            margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 13 }}
              axisLine={{ stroke: "#d1d5db" }}
            />
            <YAxis domain={[0, yAxisMax]} tick={{ fill: "#6b7280", fontSize: 13 }} tickCount={5} />
            <Tooltip
              cursor={{ fill: "rgba(255, 215, 0, 0.08)" }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalParticipants"
              fill="url(#goldGradientLight)"
              radius={[8, 8, 0, 0]}
              barSize={55}
            >
              <LabelList
                position="top"
                offset={4}
                className="fill-[#c5a100] font-semibold"
                fontSize={12}
              />
            </Bar>

            <defs>
              <linearGradient id="goldGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffdd55" />
                <stop offset="100%" stopColor="#e6c200" />
              </linearGradient>
            </defs>
          </BarChart>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-600 border-t border-[#e6d8a2]/70 px-2 py-1 bg-[#fffdf6]/70">
        Showing total participants for the last {period === "90d" ? 3 : period === "180d" ? 6 : 12}{" "}
        months
      </CardFooter>
    </Card>
  );
}
