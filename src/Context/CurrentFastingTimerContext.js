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
      const totalSeconds = (new Date(currentFasting.timeToEnd)).getTime() - (new Date(currentFasting.startedAt)).getTime()
      interval = setInterval(() => {
        if (Date.now() > (new Date()).getTime()) {
          clearInterval(interval);
        } else {
          const elapsedSeconds = Date.now() - (new Date(currentFasting.startedAt)).getTime();
          const duration = dayjs.duration(elapsedSeconds);
          setElapsedTime(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
          setElapsedPercentage(elapsedSeconds / totalSeconds * 100)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval);
    }
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
