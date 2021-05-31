import { createContext, useState } from 'react';
import { useMutation, useQuery } from '../hooks/axios-query';

export const CurrentFastingContext = createContext();

export const CurrentFastingProvider = ({ children }) => {
  const [goal, setGoal] = useState('16:8');
  const [{ isLoading, data }, refetchCurrentFasting] = useQuery('/current/fast');
  const [, startMutation] = useMutation('/start/fasting', { start: Date.now(), goal: goal }, refetchCurrentFasting);
  const [, endMutation] = useMutation('/end', { end: Date.now() }, refetchCurrentFasting);

  const start = () => {
    startMutation()
    refetchCurrentFasting();
  };

  const end = () => {
    endMutation()
    refetchCurrentFasting();
  };

  return (
    <CurrentFastingContext.Provider value={{
      currentFasting: data,
      isLoading,
      start,
      end,
      goal,
      setGoal
    }}>
      {children}
    </CurrentFastingContext.Provider>
  );
}
