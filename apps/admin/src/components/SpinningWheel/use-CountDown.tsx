import { useEffect, useMemo, useState, type FC } from "react";

interface CountDownProps {
  startDate: string;
  endDate: string;
  onComplete?: () => void; // 👈 restored optional callback
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
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

export const useCountDown = ({ startDate, endDate, onComplete }: CountDownProps) => {
  const getLadiesNightCountDown = useMemo(() => {
    const startDateConverted = new Date(startDate);
    const endDateConverted = new Date(endDate);
    const currentDate = new Date();

    if (currentDate > endDateConverted) {
      return {
        IsActive: false,
        IsDisabled: true,
      };
    }

    if (currentDate < startDateConverted) {
      return {
        ladiesNightIsActive: false,
        IsDisabled: false,
        date: startDateConverted,
      };
    }

    return {
      ladiesNightIsActive: true,
      IsDisabled: false,
      date: endDateConverted,
    };
  }, [startDate, endDate]);

  const targetDate = getLadiesNightCountDown?.date ?? null;
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeRemaining(null);
      return;
    }

    const updateTimer = () => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      // ✅ Trigger onComplete callback when countdown reaches zero
      if (remaining.total === 0 && typeof onComplete === "function") {
        onComplete();
      }
    };

    updateTimer(); // Run immediately
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, onComplete]);

  let label: string;

  if (getLadiesNightCountDown.IsDisabled) {
    label = "❌ No Spinning Wheel Scheduled";
  } else if (getLadiesNightCountDown.ladiesNightIsActive) {
    label = "🎉 Event is Active!";
  } else {
    label = "📅 Upcoming! Spinning Wheel starts in:";
  }

  return {
    timeRemaining,
    label,
  };
};
