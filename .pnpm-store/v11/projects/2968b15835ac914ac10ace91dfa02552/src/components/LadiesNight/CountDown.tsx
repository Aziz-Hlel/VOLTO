import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import React, { useMemo, type FC } from "react";
import cronParser from "cron-parser";
import { useCountDown } from "./use-CountDown";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface CountDownProps {
  ladiesNight: LadiesNightDetailsResponse | undefined;
  isFetched: boolean;
}

const CountDown: FC<CountDownProps> = ({ ladiesNight, isFetched }) => {
  const { label, timeRemaining } = useCountDown({ ladiesNight });

  //   '🔴 Live Now' : '📅 Upcoming'
  return (
    <>
      <Button>
        {isFetched && (
          <span>
            {label}{" "}
            <span>
              {timeRemaining?.days}d {timeRemaining?.hours}h {timeRemaining?.minutes}m{" "}
              {timeRemaining?.seconds}s
            </span>
          </span>
        )}
        {!isFetched && <Spinner />}
      </Button>
    </>
  );
};

export default CountDown;
