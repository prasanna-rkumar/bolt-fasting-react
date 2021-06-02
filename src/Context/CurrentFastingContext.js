import { createContext, useContext, useEffect, useState } from 'react';
import Button from '../Components/Button';
import ConfirmFastEnd from '../Components/ConfirmFastEnd';
import Modal from '../Components/Modal';
import { useMutation, useQuery } from '../hooks/axios-query';
import getGoalHoursFromGoalString from '../utils/getGoalHoursFromGoalString';
import { DashboardContext } from './DashboardContext';

export const CurrentFastingContext = createContext();

export const CurrentFastingProvider = ({ children }) => {
  const [goal, setGoal] = useState('16:8');
  const [{ isLoading, data: currentFasting }, refetchCurrentFasting] = useQuery('/current/fast');
  const [startingTime, setStartingTime] = useState(new Date());
  const [endingTime, setEndingTime] = useState(new Date());

  const [, startMutation] = useMutation('/start/fasting', { start: startingTime, goal: goal }, refetchCurrentFasting);
  const [, endMutation] = useMutation('/end/fasting', { end: new Date() }, refetchCurrentFasting);

  const [isEndModalOpen, setEndModalOpen] = useState(false);
  const [isStartModalOpen, setStartModalOpen] = useState(false);

  const { refetchWeekData, refetchStats } = useContext(DashboardContext);

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

  const start = (force = false) => {
    startMutation({
      start: startingTime,
      goal,
      force,
    }).then(res => {
      if (res.isConflict) {
        setStartModalOpen(true)
      }
      refetchWeekData();
      refetchStats();
    })
    refetchCurrentFasting();
  };

  const end = (data) => {
    setEndModalOpen(true)
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
      <>
        <Modal isOpen={isEndModalOpen} onClose={() => setEndModalOpen(false)}>
          <div>
            <ConfirmFastEnd onConfirm={(data) => {
              endMutation(data).then(() => {
                refetchWeekData();
                refetchStats();
              })
              setEndModalOpen(false)
            }} />
          </div>
        </Modal>
        <Modal isOpen={isStartModalOpen} onClose={() => setStartModalOpen(false)} >
          <div>
            <div className="max-w-md w-full p-4 bg-white rounded-2xl shadow-2xl">
              <div>
                <h3 className="font-medium text-sm text-gray-500">Conflicting Timing</h3>
                <h6 className="text-lg font-semibold">There is a fasting record at the time you set. <br /> Do you want to replace it?</h6>
              </div>
              <div className="flex gap-x-4 justify-end mt-3">
                <Button secondary onClick={() => setStartModalOpen(false)}>Cancel</Button>
                <Button primary onClick={() => {
                  setStartModalOpen(false);
                  start(true)
                }}>Proceed</Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </CurrentFastingContext.Provider>
  );
}
