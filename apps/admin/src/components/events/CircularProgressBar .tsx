import React from 'react';

const CircularProgressBar = ({ progress }: { progress: number }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - ((100-progress) / 100) * circumference;

    return (
        <div className="flex items-center justify-center z-50">
            <svg
                className="w-5 h-5 -rotate-90"
                viewBox="0 0 100 100"
            >
                {/* Background Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeWidth="10"
                    className="stroke-blue-600 bg-gray-200"
                />

                {/* Progress Circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="bg-blue-600 stroke-current transition-all duration-500 ease-in-out "
                />
            </svg>

            {/* Optional Percentage Text */}
     
        </div>
    );
};

export default CircularProgressBar;