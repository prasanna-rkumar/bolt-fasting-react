import { useState, useEffect, useContext } from 'react';
import { CurrentFastingTimerContext } from '../../Context/CurrentFastingTimerContext';

const Progress = () => {
  const { elapsedPercentage } = useContext(CurrentFastingTimerContext);
  const [percentage, setPercentage] = useState(0);


  // mapping percentage to 75% max
  useEffect(() => {
    const tempPercentage = 75 * elapsedPercentage / 100;
    if (tempPercentage <= 75)
      setPercentage(tempPercentage)
    else
      setPercentage(75)
  }, [elapsedPercentage]);

  return (
    <svg viewBox="0 0 36 36" className={`absolute ${elapsedPercentage >= 75 && 'animate-pulse'}`} style={{ transform: 'rotateZ(37deg) scaleY(-1) scaleX(-1)' }}>
      <path className="circle-bg text-primary-dark stroke-current"
        strokeDasharray="75, 100"
        d="M18 3
      a 15 15 0 0 1 0 30
      a 15 15 0 0 1 0 -30"
      />
      <path className="circle text-secondary stroke-current"
        strokeDasharray={`${percentage} 100`}
        d="M18 3
      a 15 15 0 0 1 0 30
      a 15 15 0 0 1 0 -30"
      />
    </svg>
  );
};

export default Progress;
