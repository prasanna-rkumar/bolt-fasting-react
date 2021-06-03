import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { createContext, useContext, useEffect, useState } from 'react';
import { CurrentFastingContext } from './CurrentFastingContext';

dayjs.extend(duration);

export const CurrentFastingTimerContext = createContext();

export const CurrentFastingTimerProvider = ({ children }) => {
  const { currentFasting } = useContext(CurrentFastingContext);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [elapsedPercentage, setElapsedPercentage] = useState(0);

  useEffect(() => {
    let interval;
    if (currentFasting) {
      const totalSeconds =
        dayjs(currentFasting.timeToEnd)
          .diff(dayjs(currentFasting.startedAt))
      interval = setInterval(() => {
        const elapsedSeconds = Date.now() - (new Date(currentFasting.startedAt)).getTime();
        const duration = dayjs.duration(elapsedSeconds);
        setElapsedTime(duration.format("HH:mm:ss"));
        setElapsedPercentage(elapsedSeconds / totalSeconds * 100)
      }, 1000)
    } else {
      setElapsedPercentage(0);
      setElapsedTime('00:00:00')
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentFasting])

  return (
    <CurrentFastingTimerContext.Provider value={{
      elapsedTime,
      elapsedPercentage
    }}>
      {children}
    </CurrentFastingTimerContext.Provider>
  );
}
