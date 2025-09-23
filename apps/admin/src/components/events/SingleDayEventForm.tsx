
import { useEffect, useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFormContext } from 'react-hook-form'
import useTimeHook from './hooks/use-time-hook'

const DatePickerAndTimeRangePicker = ({ startDateFieldName, endDateFieldName }: { startDateFieldName: string, endDateFieldName: string }) => {

    const { setValue, watch } = useFormContext()
    const startDate = watch(startDateFieldName)
    const endDate = watch(endDateFieldName)


    const {
        startingHour,
        amPM,
        duration,
        handleStartingHourChange,
        handleAMPMChange,
        handleDuration
    } = useTimeHook();


    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>(startDate ?? new Date())



    const updateFormFields = () => {
        const newStartDate = new Date(date.setHours(amPM === 'PM' ? startingHour + 12 : startingHour))
        setValue(startDateFieldName, newStartDate)

        const newEndDate = (new Date(newStartDate))
        newEndDate.setHours(newEndDate.getHours() + duration)
        setValue(endDateFieldName, newEndDate)
    }


    const handleDateChange = (date?: Date) => {
        if (!date) return
        setDate(date)
        setOpen(false)
    }



    useEffect(() => {
        console.log("date : ", date, " startingHour : ", startingHour, " amPM : ", amPM, " duration : ", duration)
        updateFormFields()
    }, [date, startingHour, amPM, duration])



    return (
        <div className='flex gap-6'>
            <div className='flex w-full max-w-xs flex-col gap-3'>
                <Label htmlFor='date' className='px-1'>
                    Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='outline' id='date' className='w-full justify-between font-normal'>
                            {date ? date.toLocaleDateString() : 'Pick a date'}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
                        <Calendar
                            mode='single'
                            selected={date}
                            onSelect={date => handleDateChange(date)}
                        />
                    </PopoverContent>
                </Popover>
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

export default DatePickerAndTimeRangePicker
