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
  const initStartTimeDayPeriod = startDate.getHours() >= 12 ? "PM" : "AM";
  const initEndTimeDayPeriod = endDate.getHours() >= 12 ? "PM" : "AM";

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
    initStartingHour: startDate.getHours() % 12 === 0 ? 12 : startDate.getHours() % 12,
    initEndingHour: endDate.getHours() % 12 === 0 ? 12 : endDate.getHours() % 12,
    initStartTimeDayPeriod: initStartTimeDayPeriod,
    initEndTimeDayPeriod: initEndTimeDayPeriod,
  });

  const handleRangeDateChange = (selectedRange: DateRange | undefined) => {
    if (!selectedRange || !selectedRange.from || !selectedRange.to) return;
    setRange(selectedRange);
  };

  const updateFormFields = () => {
    if (!range.from || !range.to) return;

    const newStartDate = new Date(range.from);
    newStartDate.setHours(StartTimeDayPeriod === "PM" ? startTime + 12 : startTime);
    newStartDate.setMinutes(0);
    newStartDate.setSeconds(0);

    const newEndDate = new Date(range.to);
    newEndDate.setHours(endTimeDayPeriod === "PM" ? endTime + 12 : endTime);
    newEndDate.setMinutes(0);
    newEndDate.setSeconds(0);

    setValue(startDateFieldName, newStartDate);
    setValue(endDateFieldName, newEndDate);

    console.log("newStartDate : ", newStartDate, " newEndDate : ", newEndDate);
  };

  useEffect(() => {
    updateFormFields();
  }, [range, startTime, StartTimeDayPeriod, endTime, endTimeDayPeriod]);

  return (
    <div className="flex gap-6 items-start">
      <div className="flex flex-col gap-3">
        <Label htmlFor="dates" className="px-1 flex ">
          Select Event's Days
          <span className="text-xs  siz font-thin">* Double click to select one day</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" id="dates" className="w-56 justify-between font-normal">
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              captionLayout="dropdown"
              onSelect={handleRangeDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flec gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-from" className="px-1">
            Starring at
          </Label>

          <div className="flex gap-2 justify-center items-center">
            <Input
              type="number"
              min={0}
              max={12}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
      </div>

      <div className="flex flec gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-from" className="px-1">
            Ending at
          </Label>

          <div className="flex gap-2 justify-center items-center">
            <Input
              type="number"
              min={0}
              max={12}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
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
    </div>
  );
}
