import type { LadiesNightDetailsResponse } from "@/types/ladiesNight/LadiesNightDetailsResponse";
import React, { useMemo, type FC } from "react";
import cronParser from "cron-parser";
import { useCountDown } from "./use-CountDown";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import type { SpinningWheelResponseDto } from "@/types/spinnigWheel/SpinningWheel.response";

interface CountDownProps {
  spinningWheel: SpinningWheelResponseDto | undefined;
  isFetched: boolean;
}

const CountDown: FC<CountDownProps> = ({ spinningWheel, isFetched }) => {
  const { label, timeRemaining } = useCountDown({
    startDate: spinningWheel.startDate,
    endDate: spinningWheel.endDate,
  });

  //   '🔴 Live Now' : '📅 Upcoming'
  return (
    <>
      <Button>
        {isFetched && (
          <span>
            {label}{" "}
            <span>
              {timeRemaining &&
                `${timeRemaining?.days}d ${timeRemaining?.hours}h ${timeRemaining?.minutes}m ${timeRemaining?.seconds}s`}
            </span>
          </span>
        )}
        {!isFetched && <Spinner />}
      </Button>
    </>
  );
};

export default CountDown;
