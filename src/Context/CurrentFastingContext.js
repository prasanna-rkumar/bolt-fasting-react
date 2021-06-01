import { createContext, useEffect, useState } from 'react';
import ConfirmFastEnd from '../Components/ConfirmFastEnd';
import Modal from '../Components/Modal';
import { useMutation, useQuery } from '../hooks/axios-query';
import getGoalHoursFromGoalString from '../utils/getGoalHoursFromGoalString';

export const CurrentFastingContext = createContext();

export const CurrentFastingProvider = ({ children }) => {
  const [goal, setGoal] = useState('16:8');
  const [{ isLoading, data: currentFasting }, refetchCurrentFasting] = useQuery('/current/fast');
  const [startingTime, setStartingTime] = useState(new Date());
  const [endingTime, setEndingTime] = useState(new Date());

  const [, startMutation] = useMutation('/start/fasting', { start: startingTime, goal: goal }, refetchCurrentFasting);
  const [, endMutation] = useMutation('/end/fasting', { end: new Date() }, refetchCurrentFasting);

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const goalHours = getGoalHoursFromGoalString(goal);
    let tempStarting, tempEnding;

    if (currentFasting) {
      tempStarting = new Date(currentFasting.startedAt)
      tempEnding = new Date(currentFasting.timeToEnd)
    } else {
      tempStarting = new Date()
      tempEnding = new Date(tempStarting.getTime() + (goalHours * 60 * 60 * 1000))
    }
    setStartingTime(tempStarting);
    setEndingTime(tempEnding);
  }, [currentFasting, goal]);

  const start = () => {
    startMutation()
    refetchCurrentFasting();
  };

  const end = (data) => {
    setOpen(true)
  };

  return (
    <CurrentFastingContext.Provider value={{
      currentFasting,
      isLoading,
      start,
      end,
      goal,
      setGoal,
      startingTime,
      setStartingTime,
      endingTime,
      setEndingTime,
    }}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <div>
          <ConfirmFastEnd onConfirm={(data) => endMutation(data)} />
        </div>
      </Modal>
    </CurrentFastingContext.Provider>
  );
}
