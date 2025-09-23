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
import { useFormContext } from "react-hook-form"
import useTimeHook from "./hooks/use-time-hook"
import { Input } from "../ui/input"

export default function RangeEventDate({ startDateFieldName, endDateFieldName }: { startDateFieldName: string, endDateFieldName: string }) {

  const { setValue } = useFormContext() // grab form context
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(), to: new Date() })

  const {
    startingHour,
    amPM,
    duration,
    handleStartingHourChange,
    handleAMPMChange,
    handleDuration
  } = useTimeHook();


  const handleRangeDateChange = (selectedRange: DateRange | undefined) => {

    if (!selectedRange) return
    setRange(selectedRange)

    // Push values into form
    setValue(startDateFieldName, selectedRange?.from ?? null, {
      shouldValidate: true,
    })
    setValue(endDateFieldName, selectedRange?.to ?? null, {
      shouldValidate: true,
    })
  }

  return (

    <div className='flex gap-6'>

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
              onSelect={handleRangeDateChange}

            />
          </PopoverContent>
        </Popover>

      </div>

      <div className='flex flec gap-4'>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='time-from' className='px-1'>
            Starring at
          </Label>

          <div className='flex gap-2 justify-center items-center'>
            <Input
              type='number'
              min={0}
              max={12}
              className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
              value={startingHour}
              onChange={handleStartingHourChange}
            />
            <select value={amPM} onChange={handleAMPMChange} className='bg-background rounded-md border border-input px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
              <option value='AM'>AM</option>
              <option value='PM'>PM</option>
            </select>
          </div>

        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Label htmlFor='time-to' className='px-1 '>
          Duration
        </Label>

        <div className='flex gap-2 justify-center items-center'>
          <Input
            type='number'
            id='time-to'
            step='1'
            className=' w-20 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            value={duration}
            onChange={handleDuration}
            min={1}
            max={20}
          />
          <div>Hours</div>
        </div>
      </div>

    </div>



  )
}
