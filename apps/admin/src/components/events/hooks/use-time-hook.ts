import { useState } from "react"



const useTimeHook = ({ initStartingHour, initEndingHour, initStartTimeDayPeriod, initEndTimeDayPeriod }: { initStartingHour: number, initEndingHour: number, initStartTimeDayPeriod: 'AM' | 'PM', initEndTimeDayPeriod: 'AM' | 'PM' }) => {

    console.log(" useTimeHook called with: ", { initStartingHour, initAmPM: initStartTimeDayPeriod })
    const [startTime, setStartTime] = useState<number>(initStartingHour ?? 8);
    const [endTime, setEndHour] = useState<number>(initEndingHour ?? 4);
    const [StartTimeDayPeriod, setStartTimeDayPeriod] = useState<'AM' | 'PM'>(initStartTimeDayPeriod ?? 'PM');
    const [endTimeDayPeriod, setEndTimeDayPeriod] = useState<'AM' | 'PM'>(initEndTimeDayPeriod ?? 'AM');

    const handleStartTimeDayPeriod = (e: React.ChangeEvent<HTMLSelectElement>) => setStartTimeDayPeriod(e.currentTarget.value as 'AM' | 'PM');
    const handleEndTimeDayPeriod = (e: React.ChangeEvent<HTMLSelectElement>) => setEndTimeDayPeriod(e.currentTarget.value as 'AM' | 'PM');

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return
        const hour = parseInt(e.target.value, 10)
        setStartTime(hour)
    }

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return
        const hour = parseInt(e.target.value, 10)
        setEndHour(hour)
    }




    return {
        startTime,
        endTime,
        StartTimeDayPeriod,
        endTimeDayPeriod,
        handleStartTimeDayPeriod,
        handleEndTimeDayPeriod,
        handleStartTimeChange,
        handleEndTimeChange,
    }


}

export default useTimeHook