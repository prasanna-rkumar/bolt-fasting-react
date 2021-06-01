import dayjs from "dayjs";
import { useContext } from "react";
import { CurrentFastingContext } from "../../Context/CurrentFastingContext";
import getGoalHoursFromGoalString from "../../utils/getGoalHoursFromGoalString";
import TimePicker from "./TimePicker";
import editPencil from '../../assets/edit-pencil.svg'

const Timings = () => {
  const {
    currentFasting,
    goal,
    startingTime,
    setStartingTime,
    endingTime
  } = useContext(CurrentFastingContext);
  const goalHours = getGoalHoursFromGoalString(goal);

  /* useEffect(() => {
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
  }, [currentFasting, goalHours]) */

  return (
    <div className="flex flex-row justify-around w-full">

      <Timing label={currentFasting ? 'Started At' : 'Starting'} value={dayjs(startingTime).format("D MMM, hh:mm A")}>
        <TimePicker 
          onChange={(val) => {
            setStartingTime(val)
          }} 
          min={dayjs().subtract(goalHours, 'hour').toDate()} 
          max={dayjs().toDate()}
          maxFailureMessage="Start time cannot be later than current time"
          minFailureMessage="Start time cannot be earlier than fasting goal"
        >
          <img className="inline" width={12} height={12} alt="edit" src={editPencil} />
        </TimePicker>
      </Timing>
      <Timing label="Ending at" value={dayjs(endingTime).format("D MMM, h:mm A")} />
    </div>
  );
};

export default Timings;

const Timing = ({ label, value, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-white font-bold text-opacity-50 text-xs uppercase">{label}</span>
    <span className="text-white text-xs">{value}{' '}{children}</span>
  </div>
);