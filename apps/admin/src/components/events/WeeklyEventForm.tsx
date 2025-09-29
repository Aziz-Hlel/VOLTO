import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";

import parser from "cron-parser";
import useCronTimeHook from "./hooks/use-cron-time-hook";

const daysOfTheWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
] as const;

const WeeklyEventForm = ({
  startDateFieldName,
  endDateFieldName,
}: {
  startDateFieldName: string;
  endDateFieldName: string;
}) => {
  const { setValue, watch } = useFormContext();
  const cronStartDate = watch(startDateFieldName);
  const cronEndDate = watch(endDateFieldName);
  const _1hour = 1000 * 60 * 60;

  console.log("cronStartDate : ", cronStartDate, " \n cronEndDate : ", cronEndDate);

  // return null

  const dayOfWeekFromCron = (cron: string): number => {
    if (!cron) return 0;
    try {
      const interval = parser.parseExpression(cron);
      console.log("t5l tryyyyyy, interval : ", cron);
      const next = interval.next().toDate();
      console.log("next date : ", next);
      console.log("day ::::: ", next.getDay());
      return next.getDay();
    } catch (err) {
      console.error("Error parsing cron expression:", err);
      return 0; // Default to Sunday on error
    }
  };

  const getInitHoursFromCron = (cron: string): number => {
    if (!cron) return 8;
    try {
      const interval = parser.parseExpression(cron);
      const next = interval.next();
      return next.getHours() % 12;
    } catch (err) {
      console.error("Error parsing cron expression:", err);
      return 0; // Default to 0 on error
    }
  };

  const getInitAMPMFromCron = (cron: string): "AM" | "PM" => {
    if (!cron) return "PM";
    try {
      const interval = parser.parseExpression(cron);
      const next = interval.next();
      return next.getHours() >= 12 ? "PM" : "AM";
    } catch (err) {
      console.error("Error parsing cron expression:", err);
      return "PM"; // Default to PM on error
    }
  };

  const getInitialDurationFromCron = (cronStartDate: string, cronEndDate: string): number => {
    if (!cronStartDate || !cronEndDate) return 8;
    try {
      console.log("getInitialDurationFromCron called with: ", { cronStartDate, cronEndDate });
      const startInterval = parser.parseExpression(cronStartDate);
      const endInterval = parser.parseExpression(cronEndDate);
      const start = startInterval.next().toDate();
      const end = endInterval.next().toDate();
      console.log("start : ", start, " end : ", end);
      return (end.getTime() - start.getTime()) / _1hour;
    } catch (err) {
      console.error("Error parsing cron expression:", err);
      return 8;
    }
  };

  const initialDay = cronStartDate && cronEndDate ? dayOfWeekFromCron(cronStartDate) : 0;
  console.log("initialDay : ", initialDay);

  const {
    startingHour,
    amPM,
    duration,
    handleStartingHourChange,
    handleAMPMChange,
    handleDuration,
  } = useCronTimeHook({
    initDuration:
      cronStartDate && cronEndDate ? getInitialDurationFromCron(cronStartDate, cronEndDate) : 8,
    initStartingHour: cronStartDate && cronEndDate ? getInitHoursFromCron(cronStartDate) : 8,
    initAmPM: cronStartDate && cronEndDate ? getInitAMPMFromCron(cronStartDate) : "PM",
  });

  const [open, setOpen] = useState(false);

  const [day, setDay] = useState<number>(initialDay);
  console.log("l day bidou fil state : ", day);

  const createCronExpression = (day: number, hour: number, ampm: "AM" | "PM") => {
    const adjustedHour = ampm === "PM" ? (hour % 12) + 12 : hour % 12;
    return `0 ${adjustedHour} * * ${day}`;
  };

  const updateFormFields = () => {
    try {
      const newCronStartDateExpression = createCronExpression(day, startingHour, amPM);
      const cronStartDate = parser.parseExpression(newCronStartDateExpression);
      const startDateExampleStr = cronStartDate.next().toString();
      const startDateExample = new Date(startDateExampleStr);
      const endDateExample = new Date(startDateExample.getTime() + duration * 60 * 60 * 1000);

      const endDayOfWeek = endDateExample.getDay();
      const endHour = endDateExample.getHours() % 12;
      const endAMPM = endDateExample.getHours() >= 12 ? "PM" : "AM";
      const newCronEndDateExpression = createCronExpression(endDayOfWeek, endHour, endAMPM);

      setValue(startDateFieldName, newCronStartDateExpression, { shouldDirty: true });
      setValue(endDateFieldName, newCronEndDateExpression, { shouldDirty: true });
    } catch (err) {
      console.log("Something went wrong with updating cron expressions");
      setValue(startDateFieldName, "0 8 * * 0", { shouldDirty: true });
      setValue(endDateFieldName, "0 10 * * 0", { shouldDirty: true });
    }
  };

  useEffect(() => {
    console.log("cronStartDate : ", cronStartDate, " cronEndDate : ", cronEndDate);
  }, []);

  const handleDayChange = (day: string) => {
    const dayNumber = parseInt(day, 10);
    setDay(dayNumber);
    setOpen(false);
  };

  useEffect(() => {
    updateFormFields();
  }, [day, startingHour, amPM, duration]);

  return (
    <>
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="time-from" className="px-1">
              Every
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {day
                    ? daysOfTheWeek.find((dayOfWeek) => dayOfWeek.value === day)?.label
                    : "Select Day of the week... "}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {daysOfTheWeek.map((dayOfWeek) => (
                        <CommandItem
                          key={dayOfWeek.value}
                          value={dayOfWeek.value.toString()}
                          onSelect={handleDayChange}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              day === dayOfWeek.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {dayOfWeek.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div></div>

        <div className="flex gap-4">
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
                value={startingHour}
                onChange={handleStartingHourChange}
              />
              <select
                value={amPM}
                onChange={handleAMPMChange}
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
    </>
  );
};

export default WeeklyEventForm;
