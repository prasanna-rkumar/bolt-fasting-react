import { useContext } from "react";
import { CurrentFastingContext } from "../../Context/CurrentFastingContext";

const TimerButton = () => {
  const { currentFasting, start, end } = useContext(CurrentFastingContext);

  const onClick = () => {
    if (currentFasting) end();
    else start();
  }

  return (
    <button onClick={onClick} className="outline-none bg-secondary text-primary-dark w-14 rounded-full px-1 py-1 text-xs font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ">
      {
        currentFasting ? 'End' : 'Start'
      }
    </button>
  );
}

export default TimerButton;
