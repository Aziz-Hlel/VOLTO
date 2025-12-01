import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import useTimeHook from "./hooks/use-time-hook";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { BAHRAIN_TIMEZONE, formatInBahrainTime } from "@/utils/dateUtils";
import { toZonedTime } from "date-fns-tz/toZonedTime";
import { fromZonedTime } from "date-fns-tz/fromZonedTime";

export default function RangeEventDate({
  startDateFieldName,
  endDateFieldName,
}: {
  startDateFieldName: string;
  endDateFieldName: string;
}) {
  const { setValue, watch } = useFormContext(); // grab form context

  const _1hour = 1000 * 60 * 60;
  const startDate = watch(startDateFieldName) ? new Date(watch(startDateFieldName)) : new Date();
  const endDate = watch(endDateFieldName)
    ? new Date(watch(endDateFieldName))
    : new Date(startDate.getTime() + 8 * _1hour);

  const starTimeBahrain = formatInBahrainTime(startDate, "hh");
  const endTimeBahrain = formatInBahrainTime(endDate, "hh");
  const initStartTimeDayPeriod = parseInt(starTimeBahrain) >= 12 ? "PM" : "AM";
  const initEndTimeDayPeriod = parseInt(endTimeBahrain) >= 12 ? "PM" : "AM";

  const [range, setRange] = useState<DateRange>({ from: startDate, to: endDate });

  const {
    startTime,
    StartTimeDayPeriod,
    endTime,
    endTimeDayPeriod,
    handleStartTimeChange,
    handleEndTimeChange,
    handleStartTimeDayPeriod,
    handleEndTimeDayPeriod,
  } = useTimeHook({
    initStartingHour: parseInt(starTimeBahrain) % 12 === 0 ? 12 : parseInt(starTimeBahrain) % 12,
    initEndingHour: parseInt(endTimeBahrain) % 12 === 0 ? 12 : parseInt(endTimeBahrain) % 12,
    initStartTimeDayPeriod: initStartTimeDayPeriod,
    initEndTimeDayPeriod: initEndTimeDayPeriod,
  });

  const handleRangeDateChange = (selectedRange: DateRange | undefined) => {
    if (!selectedRange || !selectedRange.from || !selectedRange.to) return;
    setRange(selectedRange);
  };

  const updateFormFields = () => {
    if (!range.from || !range.to) return;

    const newStartDate = range.from;
    const newStartDateUtc = toZonedTime(newStartDate, BAHRAIN_TIMEZONE); // works like utcToZonedTime

    newStartDateUtc.setHours(StartTimeDayPeriod === "PM" ? startTime + 12 : startTime);
    newStartDateUtc.setMinutes(0);
    newStartDateUtc.setSeconds(0);

    const newStartDateInBahrain = fromZonedTime(newStartDateUtc, BAHRAIN_TIMEZONE);

    const newEndDate = range.to;
    const newEndDateUtc = toZonedTime(newEndDate, BAHRAIN_TIMEZONE);

    newEndDateUtc.setHours(endTimeDayPeriod === "PM" ? endTime + 12 : endTime);
    newEndDateUtc.setMinutes(0);
    newEndDateUtc.setSeconds(0);
    const newEndDateInBahrain = fromZonedTime(newEndDateUtc, BAHRAIN_TIMEZONE);

    setValue(startDateFieldName, newStartDateInBahrain);
    setValue(endDateFieldName, newEndDateInBahrain);

  };

  useEffect(() => {
    updateFormFields();
  }, [range, startTime, StartTimeDayPeriod, endTime, endTimeDayPeriod]);

  return (
    <div className="flex flex-col items-baseline  md:flex-row md:items-end gap-6 w-full">
      {/* Sélection de date */}
      <div className="flex flex-col  gap-2 md:w-80">
        <Label htmlFor="dates" className="px-1 flex ">
          Select Event's Days
          <span className="text-xs font-thin">* Double click to select one day</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" id="dates" className="w-full justify-between font-normal">
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="range"
              timeZone={BAHRAIN_TIMEZONE}
              selected={range}
              captionLayout="dropdown"
              onSelect={handleRangeDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Heure de début */}
      <div className="flex flex-col gap-2 md:w-40">
        <Label htmlFor="time-from" className="px-1">
          Starting at
        </Label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            min={0}
            max={12}
            className="bg-background w-20 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <select
            value={StartTimeDayPeriod}
            onChange={handleStartTimeDayPeriod}
            className="bg-background rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {/* Heure de fin */}
      <div className="flex flex-col gap-2 md:w-40">
        <Label htmlFor="time-to" className="px-1">
          Ending at
        </Label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            min={0}
            max={12}
            className="bg-background w-20 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
            value={endTime}
            onChange={handleEndTimeChange}
          />
          <select
            value={endTimeDayPeriod}
            onChange={handleEndTimeDayPeriod}
            className="bg-background rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
}
