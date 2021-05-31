import { useState, useEffect, useContext } from 'react';
import { CurrentFastingTimerContext } from '../../Context/CurrentFastingTimerContext';

const Progress = () => {
  const { elapsedPercentage } = useContext(CurrentFastingTimerContext);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(75 * elapsedPercentage / 100)
  }, [elapsedPercentage]);

  return (
    <svg viewBox="0 0 36 36" className="absolute" style={{ transform: 'rotateZ(36deg) scaleY(-1) scaleX(-1)' }}>
      <path className="circle-bg stroke-current text-black text-opacity-40"
        strokeDasharray="75, 100"
        d="M18 3
      a 15 15 0 0 1 0 30
      a 15 15 0 0 1 0 -30"
      />
      <path className="circle stroke-current text-red-200"
        strokeDasharray={`${percentage} 100`}
        d="M18 3
      a 15 15 0 0 1 0 30
      a 15 15 0 0 1 0 -30"
      />
    </svg>
  );
};

export default Progress;
