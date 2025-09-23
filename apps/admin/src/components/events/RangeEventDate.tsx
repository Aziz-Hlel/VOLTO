"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Controller, useFormContext } from "react-hook-form"

export default function RangeEventDate({ startDateFieldName, endDateFieldName }: { startDateFieldName: string, endDateFieldName: string }) {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const { control, setValue } = useFormContext() // grab form context



  return (
    <Controller
      control={control}
      name={startDateFieldName}
      render={({ _ }) => (

        <div className="flex flex-col gap-3">
          <Label htmlFor="dates" className="px-1">
            Select Event's Days
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="dates"
                className="w-56 justify-between font-normal"
              >
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
                onSelect={(selectedRange) => {
                  setRange(selectedRange)

                  // Push values into form
                  setValue(startDateFieldName, selectedRange?.from ?? null, {
                    shouldValidate: true,
                  })
                  setValue(endDateFieldName, selectedRange?.to ?? null, {
                    shouldValidate: true,
                  })
                }}

              />
            </PopoverContent>
          </Popover>
        </div>

      )}
    />
  )
}
