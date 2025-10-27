import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import useTimeHook from "./hooks/use-time-hook";

export default function SingleEventDate({
  startDateFieldName,
  endDateFieldName,
}: {
  startDateFieldName: string;
  endDateFieldName: string;
}) {
  const { setValue, watch } = useFormContext(); // grab form context

  const _1hour = 1000 * 60 * 60;

  const diffInHours = (start: Date, end: Date) => {
    const diffMs = end.getTime() - start.getTime(); // difference in milliseconds
    const hours = diffMs / (1000 * 60 * 60); // convert to hours
    return Math.floor(hours); // truncate to integer
  };

  const startDate = watch(startDateFieldName) ? (new Date(watch(startDateFieldName))) : new Date();

  const endDate = watch(endDateFieldName)
    ? new Date(watch(endDateFieldName))
    : new Date(startDate.getTime() + 8 * _1hour);

  const initDuration = diffInHours(startDate, endDate);

  const initStartTimeDayPeriod = startDate.getHours() >= 12 ? "PM" : "AM";

  const [day, setDay] = useState<Date>(startDate ?? new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const {
    startTime,
    StartTimeDayPeriod,
    duration,
    handleDuration,
    handleStartTimeChange,
    handleStartTimeDayPeriod,
  } = useTimeHook({
    initStartingHour: startDate.getHours() % 12 === 0 ? 12 : startDate.getHours() % 12,
    initEndingHour: endDate.getHours() % 12 === 0 ? 12 : endDate.getHours() % 12,
    initStartTimeDayPeriod: initStartTimeDayPeriod,
    initDuration: initDuration,
  });

  const handleSingleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) setDay(selectedDate);
  };

  const updateFormFields = () => {
    const newStartDate = day;
    newStartDate.setHours(StartTimeDayPeriod === "PM" ? startTime + 12 : startTime);
    newStartDate.setMinutes(31);
    newStartDate.setSeconds(0);

    const newEndDate = new Date(day);
    newEndDate.setHours(StartTimeDayPeriod === "PM" ? startTime + 12 : startTime);
    newEndDate.setMinutes(0);
    newEndDate.setSeconds(0);
    newEndDate.setHours(newEndDate.getHours() + duration);

    setValue(startDateFieldName, newStartDate.toUTCString());
    setValue(endDateFieldName, newEndDate.toUTCString());
  };

  useEffect(() => {
    updateFormFields();
  }, [day, startTime, StartTimeDayPeriod, duration]);

  return (
    <div className="flex gap-6 items-start w-full">
      <div className="flex flex-col gap-3">
        <Label htmlFor="dates" className="px-1  ">
          Select Event's Days
        </Label>
        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="spinningwheel-dates"
              className="w-56 justify-between font-normal"
            >
              {day > new Date() ? `${day.toLocaleDateString()}` : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={day}
              captionLayout="dropdown"
              onSelect={(e) => {
                setOpenCalendar(false);
                handleSingleDateChange(e);
              }}
            />
          </PopoverContent>
        </Popover>
        <span className="text-xs  siz font-thin">* Pick a date in the past to disable</span>
      </div>

      <div className=" gap-4 h-full  ">
        <div className="flex justify-start items-start  flex-col  gap-3 h-full">
          <Label htmlFor="time-from" className="px-1">
            Starring at
          </Label>

          <div className="flex gap-2 justify-end items-end">
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

      <div className="flex flex-col gap-3">
        <Label htmlFor="time-to" className="px-1 ">
          Duration
        </Label>

        <div className="flex gap-2 justify-center items-center">
          <Input
            type="number"
            step="1"
            className=" w-20 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            value={duration}
            onChange={handleDuration}
            min={1}
            max={20}
          />
          <div>Hours</div>
        </div>
      </div>
    </div>
  );
}
