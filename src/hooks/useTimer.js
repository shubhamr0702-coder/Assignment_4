import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds = 1500) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning && secondsRemaining > 0) setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = (newTime = initialSeconds) => {
    setIsRunning(false);
    setSecondsRemaining(newTime);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return { secondsRemaining, isRunning, start, pause, reset };
}