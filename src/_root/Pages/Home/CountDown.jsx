import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const CountDown = () => {

    const loginTime = Date.now(); // Your hardcoded timestamp
    const countdownDuration = 10 * 60 * 1000; // 10 minutes in milliseconds

    const calculateRemainingTime = () => {
        const currentTime = Date.now();
        const difference = currentTime - loginTime;
        const remaining = countdownDuration - difference;
        return Math.max(0, Math.floor(remaining / 1000)); // Convert to seconds
    };

    const [timeLeft, setTimeLeft] = useState(calculateRemainingTime());

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = calculateRemainingTime();
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className='dark:text-white bg-white shadow-sm shadow-altColor flex flex-col justify-center items-center gap-3 mx-auto        w-full rounded-lg py-3 dark:bg-dark_altColor dark:shadow-none'>
            <div className='flex gap-5 text-2xl'>
                <h1 className='font-title'>Time Remaining</h1>
                <div className='font-heading'>
                    {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
                </div>
            </div>
            <h1 className='text-base font-body text-center py-1'>Once the clock hits 00:00, you’ll be logged out.</h1>
        </div>
    );
};

export default CountDown;
