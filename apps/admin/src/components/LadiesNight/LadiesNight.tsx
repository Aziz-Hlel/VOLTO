import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { ladiesNightService } from "@/Api/services/ladiesNight.service";
import cronParser from "cron-parser";
import { useMemo } from "react";

const LadiesNight = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ladies-night", "details"],
    queryFn: () => ladiesNightService.details(),
    enabled: true,
  });

  const ladiesNight = data?.data;

  const getLadiesNightCountDown = useMemo(() => {
    const currentDate = new Date();

    const startInterval = cronParser.parseExpression(ladiesNight.cronStartDate!, {
      currentDate,
    });
    const nextstartDate = startInterval.next().toDate();

    const endInterval = cronParser.parseExpression(ladiesNight.cronEndDate!, {
      currentDate,
    }); // Get this week's end date
    const nextEndDate = endInterval.next().toDate();

    if (nextstartDate < nextEndDate){
        const diff = nextstartDate.getTime() - currentDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `Event Starts in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        
    }
const diff = nextEndDate.getTime() - currentDate.getTime();
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);
return `Event Ends in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    
  }, [ladiesNight]);

  return (
    <div>
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ladies Night Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {"user?.email"}</p>
          </div>
          <Button variant="outline" className=" ">
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
};

export default LadiesNight;
