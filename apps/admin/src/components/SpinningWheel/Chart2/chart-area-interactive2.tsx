import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Area, AreaChart, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import * as React from "react";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import type { LadiesNightStatsPeriod } from "@/types/ladiesNight/GetLadiesNightByPeriodDto";
import { useQuery } from "@tanstack/react-query";
import { SpinningWheelService } from "@/Api/services/SpinningWheel.service";
import type { SpinningWheelStatsResponse } from "@/types/spinnigWheel/SpinningWheelStatsResponse";
import { Tooltip } from "@/components/ui/tooltip";

export const description = "An interactive area chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  totalParticipants: {
    label: "Total Participants",
    color: "var(--chart-1)",
  },
  participantsRedeemedCodes: {
    label: "Participants With Redeemed Codes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const description2 = "A bar chart with a label";

const chartData2 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig2 = {
  totalParticipants: {
    label: "Total Participants",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive2() {
  const [period, setPeriod] = React.useState<LadiesNightStatsPeriod>("90d");
  const handlePeriodChange = (value: LadiesNightStatsPeriod) =>
    setPeriod(value as LadiesNightStatsPeriod);

  const { data, isFetched, isLoading } = useQuery({
    queryKey: ["spinning-wheel", "period", period],
    queryFn: async () => await SpinningWheelService.statsByPeriod({ period }),
    enabled: true,
  });

  const chartData: SpinningWheelStatsResponse[] | undefined = data?.data ?? undefined;

  const filteredData =
    data?.data.map((item) => ({
      date: item.startDate,
      totalParticipants: item.totalParticipants,
      month: Intl.DateTimeFormat("en", { day: "2-digit", month: "short" }).format(
        new Date(item.startDate),
      ),
    })) ?? undefined;

  const firstInstanceStartDate = data?.data.length > 0 ? data?.data[0].startDate : null;
  const lastInstanceStartDate =
    data?.data.length > 0 ? data?.data[data?.data.length - 1].startDate : null;

  const firstInstanceDisplay = firstInstanceStartDate
    ? Intl.DateTimeFormat("en", { day: "2-digit", month: "short" }).format(
        new Date(firstInstanceStartDate),
      )
    : null;

  const lastInstanceDisplay = lastInstanceStartDate
    ? Intl.DateTimeFormat("en", { day: "2-digit", month: "short" }).format(
        new Date(lastInstanceStartDate),
      )
    : null;

  const dataMax =
    filteredData && filteredData.length
      ? Math.max(...filteredData.map((d) => d.totalParticipants ?? 0))
      : 0;

  // set a Y max that's bigger than your actual max (adjust multiplier to taste)
  const yAxisMax = Math.ceil((dataMax || 1) * 1.2); // 1.8 = 180% of dataMax; increase to make bars shorter

  return (
    <Card
      id="chart-card"
      className="w-full rounded-xl shadow-md border border-[#e6d8a2]/50 overflow-hidden h-135"
    >
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#e6d8a2]/70 px-2 py-1">
        <div>
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-[#d4af37] to-[#f4e38c] bg-clip-text text-transparent">
            Spinning Wheel Chart
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            {`${firstInstanceDisplay} - ${lastInstanceDisplay}`}
          </CardDescription>
        </div>
        <div className="text-xs text-gray-500 italic whitespace-nowrap">
          Updated live • {new Date().toLocaleDateString()}
        </div>
      </CardHeader>

      <CardContent className="p-0 flex items-center justify-center h-full">
        {!filteredData || filteredData.length === 0 ? (
          <Spinner />
        ) : (
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
        Showing total participants for the last 3 months
      </CardFooter>
    </Card>
  );
}
