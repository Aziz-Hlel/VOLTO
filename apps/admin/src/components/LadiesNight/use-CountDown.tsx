import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import { useEffect, useMemo, useState, type FC } from "react";
import cronParser from "cron-parser";

interface CountDownProps {
  ladiesNight: LadiesNightDetailsResponse | undefined;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // milliseconds remaining
}

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = Math.max(0, target - now); // Prevent negative values

  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

export const useCountDown = ({ ladiesNight }: CountDownProps) => {
  const getLadiesNightCountDown = useMemo(() => {
    if (!ladiesNight) return null;
    console.log(ladiesNight);
    const currentDate = new Date();

    const startInterval = cronParser.parseExpression(ladiesNight.cronStartDate!);
    const nextstartDate = startInterval.next().toDate();

    const endInterval = cronParser.parseExpression(ladiesNight.cronEndDate!, {
      currentDate,
    }); // Get this week's end date
    const nextEndDate = endInterval.next().toDate();

    if (nextstartDate < nextEndDate) {
      return {
        ladiesNightIsActive: false,
        date: nextstartDate,
      };
    }
    return {
      ladiesNightIsActive: true,
      date: nextEndDate,
    };
  }, [ladiesNight]);

  const targetDate = getLadiesNightCountDown?.date ?? null;
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining(null);
      return;
    }

    // Initial calculation
    const updateTimer = () => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      // Trigger onComplete callback when countdown reaches zero
      //   if (remaining.total === 0 && onComplete) {
      //     onComplete();
      //   }
    };

    updateTimer(); // Run immediately

    // Update every second
    const intervalId = setInterval(updateTimer, 1000);

    // Cleanup - Critical for preventing memory leaks
    return () => clearInterval(intervalId);
  }, [targetDate]); // onComplete]);

  const label = getLadiesNightCountDown?.ladiesNightIsActive
    ? "🔴 Live Now ! Ladies Night ends in "
    : "📅 Upcoming ! Ladies Nights starts in : ";

  return {
    timeRemaining,
    label,
  };
};
