import { useState } from "react"



const useTimeHook = () => {


    const [startingHour, setStartingHour] = useState<number>(7)
    const [amPM, setAMPM] = useState<'AM' | 'PM'>('PM')
    const [duration, setDuration] = useState<number>(8)


    const handleStartingHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return
        const hour = parseInt(e.target.value, 10)
        setStartingHour(hour)
    }

    const handleAMPMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'AM' | 'PM'
        setAMPM(value)
    }

    const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return
        const newDuration = parseInt(e.target.value, 10)
        setDuration(newDuration)


    }


    return {
        startingHour,
        amPM,
        duration,
        handleStartingHourChange,
        handleAMPMChange,
        handleDuration
    }


}

export default useTimeHook