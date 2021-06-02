import SelectGoal from "./SelectGoal"
import Progress from "./Progress"
/* import { useContext } from "react";
import { CurrentFastingContext } from "../../Context/CurrentFastingContext"; */
import ElapsedTime from "./ElapsedTime";
import TimerButton from "./TimerButton";
import Timings from "./Timings";
import { CurrentFastingTimerProvider } from "../../Context/CurrentFastingTimerContext";

const Timer = () => {
  /* const { isLoading } = useContext(CurrentFastingContext);

  console.log(isLoading) */

  return (
    <div className=" bg-primary rounded-3xl shadow-xl w-full flex flex-col items-center justify-between p-4" style={{
      maxWidth: 360,
      minHeight: 360
    }}>
      { (true) && (
        <>
          <SelectGoal />
          <div className="w-52 h-52 relative">
            <CurrentFastingTimerProvider>
              <Progress elapsedPercentage={1} />
              <ElapsedTime />
            </CurrentFastingTimerProvider>
            <TimerButton />
          </div>
          <Timings />
        </>
      )}
    </div>
  );
};

export default Timer;
