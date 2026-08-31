import { useState } from "react";

const useTimeHook = ({
  initStartingHour,
  initEndingHour,
}: {
  initStartingHour: string;
  initEndingHour: string;
}) => {
  const [startTime, setStartTime] = useState<string>(initStartingHour);
  const [endTime, setEndHour] = useState<string>(initEndingHour);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    console.log("value : ", e.target.value);
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setEndHour(e.target.value);
  };

  return {
    startTime,
    endTime,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};

export default useTimeHook;
