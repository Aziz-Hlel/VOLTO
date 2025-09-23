import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useFormContext } from "react-hook-form"

import { CronExpressionParser } from 'cron-parser';
import useTimeHook from "./hooks/use-time-hook"

const daysOfTheWeek = [
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
] as const;



const WeeklyEventForm = ({ startDateFieldName, endDateFieldName }: { startDateFieldName: string, endDateFieldName: string }) => {

    const { setValue, watch } = useFormContext()
    const cronStartDate = watch(startDateFieldName)
    const cronEndDate = watch(endDateFieldName)


    const {
        startingHour,
        amPM,
        duration,
        handleStartingHourChange,
        handleAMPMChange,
        handleDuration
    } = useTimeHook();

    const [open, setOpen] = useState(false)
    const [value, setComboBoxValue] = useState("")

    const [day, setDay] = useState<number>(0)


    const updateFormFields = () => {
        const newCronStartDate = CronExpressionParser.parse("0 * * * *");
        newCronStartDate.next().setHours(amPM === 'PM' ? startingHour + 12 : startingHour)
        newCronStartDate.next().setDay(day)

        const newStartDate = newCronStartDate.next().toDate()
        const newEndDate = new Date(newStartDate)
        newEndDate.setHours(newEndDate.getHours() + duration)
        const endDateInterval = CronExpressionParser.parse("0 * * * *");
        endDateInterval.next().setHours(newEndDate.getHours())
        endDateInterval.next().setDay(newEndDate.getDay())
        const newCronEndDate = endDateInterval.next().toDate()

        setValue(startDateFieldName, newCronStartDate)
        setValue(endDateFieldName, newCronEndDate)

    }


    const handleDayChange = (day: string) => {
        const dayNumber = parseInt(day, 10)
        setDay(dayNumber)
        setComboBoxValue(day)
        setOpen(false)
    }



    useEffect(() => {
        updateFormFields()
    }, [day, startingHour, amPM, duration])

    return (
        <>
            <div className='flex items-center gap-6 w-full'>
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-3'>
                        <Label htmlFor='time-from' className='px-1'>
                            Starring at
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {value
                                        ? daysOfTheWeek.find((framework) => framework.value === value)?.label
                                        : "Select Day of the week..."}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {daysOfTheWeek.map((framework) => (
                                                <CommandItem
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={handleDayChange}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {framework.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                    </div>
                </div>

                <div>

                </div>



                <div className='flex gap-4'>
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


        </>
    )
}

export default WeeklyEventForm