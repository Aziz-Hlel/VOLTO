import React, { useEffect, useState } from "react";



const Countdown = () => {
    const targetDate = new Date("2025-08-31T23:59:59");



    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        const totalSeconds = Math.max(Math.floor(distance / 1000), 0);

        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, [targetDate]);

    return (
        <div className="flex justify-center items-center gap-2 md:gap-4">
            <TimeUnit label="days" value={timeLeft.days} />
            <TimeUnit label="hours" value={timeLeft.hours} />
            <TimeUnit label="min" value={timeLeft.minutes} />
            <TimeUnit label="sec" value={timeLeft.seconds} />
        </div>
    );
};

type TimeUnitProps = {
    label: string;
    value: number;
};

const TimeUnit: React.FC<TimeUnitProps> = ({ label, value }) => {
    return (

        <div className="md:space-x-1 space-x-0.5 ">
            <span className="countdown font-mono md:text-2xl">
                <span
                    style={{ "--value": value } as React.CSSProperties}
                    aria-live="polite"
                    aria-label={`${value} ${label}`}
                >
                    {value}
                </span>
            </span>

            <span className="text-xs md:text-base ">
                {label}
            </span>

        </div>
    );
};

export default Countdown;
