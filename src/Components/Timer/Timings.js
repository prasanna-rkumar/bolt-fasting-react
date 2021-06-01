import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { CurrentFastingContext } from "../../Context/CurrentFastingContext";
import getGoalHoursFromGoalString from "../../utils/getGoalHoursFromGoalString";
import TimePicker from "./TimePicker";

const Timings = () => {
  const { currentFasting, goal } = useContext(CurrentFastingContext);
  const goalHours = getGoalHoursFromGoalString(goal);
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  useEffect(() => {
    let tempStarting, tempEnding;
    if (currentFasting) {
      tempStarting = currentFasting.startedAt
      tempEnding = currentFasting.timeToEnd
    } else {
      tempStarting = new Date()
      tempEnding = new Date(tempStarting.getTime() + (goalHours * 60 * 60 * 1000))
    }
    setStartingTime(tempStarting);
    setEndingTime(tempEnding);
  }, [currentFasting, goalHours]);

  useEffect(() => {
    let interval;
    if (!currentFasting) {
      interval = setInterval(() => {
        setStartingTime(Date.now())
        setEndingTime(Date.now() + (goalHours * 60 * 60 * 1000))
      }, 5 * 1000)
    }
    return () => {
      clearInterval(interval);
    };
  }, [currentFasting, goalHours])

  return (
    <div className="flex flex-row justify-around w-full">
      <TimePicker min={new Date(1622457000000)} max={new Date(1622563200000)} />
      <Timing label={currentFasting ? 'Started At' : 'Starting'} value={dayjs(startingTime).format("D MMM, hh:mm A")} />
      <Timing label="Ending at" value={dayjs(endingTime).format("D MMM, h:mm A")} />
    </div>
  );
};

export default Timings;

const Timing = ({ label, value, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-white font-bold text-opacity-50 text-xs uppercase">{label}</span>
    <span className="text-white text-xs">{value}{children}</span>
  </div>
);