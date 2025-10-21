import { useState } from "react";

const useCronTimeHook = ({
  initStartingHour,
  initAmPM,
  initDuration,
}: {
  initStartingHour: number;
  initAmPM: "AM" | "PM";
  initDuration: number;
}) => {
  const [startingHour, setStartingHour] = useState<number>(initStartingHour ?? 8);
  const [amPM, setAMPM] = useState<"AM" | "PM">(initAmPM ?? "PM");
  const [duration, setDuration] = useState<number>(initDuration ?? 8);

  const setAMPMWrapper = (value: "AM" | "PM") => setAMPM(value);

  const handleStartingHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const hour = parseInt(e.target.value, 10);
    if (hour < 1 || hour > 12) return;
    setStartingHour(hour);
  };

  const handleAMPMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "AM" | "PM";
    setAMPM(value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const newDuration = parseInt(e.target.value, 10);
    if (newDuration < 1 || newDuration > 21) return;
    setDuration(newDuration);
  };

  return {
    startingHour,
    amPM,
    duration,
    setAMPMWrapper,
    handleStartingHourChange,
    handleAMPMChange,
    handleDuration,
  };
};

export default useCronTimeHook;
