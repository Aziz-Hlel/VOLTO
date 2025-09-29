import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Calendar24Props = {
  name: string;
};

export function CalendarForm({ name }: Calendar24Props) {
  const { control } = useFormContext(); // grab form context
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-4">
      {/* Date Picker */}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label htmlFor="date-picker" className="px-1">
              Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {field.value instanceof Date ? field.value.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={field.value ?? undefined}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      />

      {/* Time Picker */}
      <Controller
        control={control}
        name={`${name}Time`} // e.g. "startDateTime"
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label htmlFor="time-picker" className="px-1">
              Time
            </Label>
            <Input
              type="time"
              id="time-picker"
              step="1"
              value={field.value ?? ""}
              onChange={field.onChange}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        )}
      />
    </div>
  );
}
