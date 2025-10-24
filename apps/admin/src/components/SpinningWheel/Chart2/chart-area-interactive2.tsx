import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis ,Area, AreaChart, YAxis} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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





export const description2 = "A bar chart with a label"

const chartData2 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig2 = {
  totalParticipants: {
    label: "Total Participants",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig



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
      month : Intl.DateTimeFormat('en', { day: '2-digit', month: 'short',  }).format(new Date(item.startDate))
    })) ?? undefined;

    const firstInstanceStartDate =data?.data.length > 0 ? data?.data[0].startDate :null;
    const lastInstanceStartDate = data?.data.length > 0 ? data?.data[data?.data.length - 1].startDate :null;

    const firstInstanceDisplay =firstInstanceStartDate ? Intl.DateTimeFormat('en', { day: '2-digit', month: 'short',  }).format(new Date(firstInstanceStartDate)):null;

    const lastInstanceDisplay = lastInstanceStartDate ? Intl.DateTimeFormat('en', { day: '2-digit', month: 'short',  }).format(new Date(lastInstanceStartDate)):null;
  
  
    const dataMax = filteredData && filteredData.length
  ? Math.max(...filteredData.map(d => d.totalParticipants ?? 0))
  : 0;

// set a Y max that's bigger than your actual max (adjust multiplier to taste)
const yAxisMax = Math.ceil((dataMax || 1) * 1.2); // 1.8 = 180% of dataMax; increase to make bars shorter

    return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <CardTitle>Spinnig Wheel Chart</CardTitle>
        <CardDescription>{`${firstInstanceDisplay} - ${lastInstanceDisplay}`}</CardDescription>

      </CardHeader>
<CardContent className="h-fit px-2 pt-4 sm:px-6 sm:pt-6">
        {!chartData && <Spinner />}
      <ChartContainer config={chartConfig2}>
  <BarChart
    data={filteredData}
    width={600}        // optional: control width if you want
    height={220}       // chart height (smaller height also helps)
    margin={{ top: 20, right: 12, left: 0, bottom: 0 }}
  >
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={5}
      axisLine={false}
    />
    {/* IMPORTANT: set YAxis domain to a value *larger* than your data max */}
    <YAxis domain={[0, yAxisMax]} hide={false} tickCount={5} />
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Bar
      dataKey="totalParticipants"
      fill="var(--color-totalParticipants)"
      radius={8}
      barSize={26}      // controls bar thickness (width)
    >
      <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
    </Bar>
  </BarChart>
</ChartContainer>


      </CardContent>
      <CardFooter>
        Showing total Participants for the last 3 months
      </CardFooter>
    </Card>
  );
}
