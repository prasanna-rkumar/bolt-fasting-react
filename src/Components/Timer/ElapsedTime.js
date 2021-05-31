import { useContext } from "react";
import { CurrentFastingTimerContext } from "../../Context/CurrentFastingTimerContext";

const ElapsedTime = () => {
  const { elapsedTime } = useContext(CurrentFastingTimerContext);
  return (
    <div className="flex flex-col absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="text-xs font-bold text-white text-opacity-50">Fasting Time</span>
      <span className="text-2xl text-white font-bold">{elapsedTime}</span>
    </div>
  );
};

export default ElapsedTime;
