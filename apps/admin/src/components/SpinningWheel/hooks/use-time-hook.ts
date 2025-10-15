import { useState } from "react";

const useTimeHook = ({
  initStartingHour,
  initStartTimeDayPeriod,
  initDuration,
}: {
  initStartingHour: number;
  initEndingHour: number;
  initStartTimeDayPeriod: "AM" | "PM";
  initDuration: number;
}) => {
  console.log(" useTimeHook called with: ", {
    initStartingHour,
    initStartTimeDayPeriod,
    initDuration,
  });
  const [startTime, setStartTime] = useState<number>(initStartingHour ?? 8);
  const [StartTimeDayPeriod, setStartTimeDayPeriod] = useState<"AM" | "PM">(
    initStartTimeDayPeriod ?? "PM",
  );
  const [duration, setDuration] = useState<number>(initDuration ?? 8);

  const handleStartTimeDayPeriod = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setStartTimeDayPeriod(e.currentTarget.value as "AM" | "PM");

  // const handleEndTimeDayPeriod = (e: React.ChangeEvent<HTMLSelectElement>) =>
  //   setEndTimeDayPeriod(e.currentTarget.value as "AM" | "PM");

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const hour = parseInt(e.target.value, 10);
    setStartTime(hour);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newDuration = parseInt(e.target.value, 10);
    setDuration(newDuration);
  };

  return {
    startTime,
    StartTimeDayPeriod,
    duration,
    handleDuration,
    handleStartTimeDayPeriod,
    handleStartTimeChange,
  };
};

export default useTimeHook;
