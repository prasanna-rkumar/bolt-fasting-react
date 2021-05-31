import { useContext } from "react";
import { CurrentFastingContext } from "../../Context/CurrentFastingContext";

const TimerButton = () => {
  const { currentFasting, start, end } = useContext(CurrentFastingContext);

  const onClick = () => {
    if (currentFasting) start();
    else end();
  }

  return (
    <button onClick={onClick} className="outline-none text-purple-900 w-14 bg-red-200 rounded-full px-1 py-1 text-xs font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ">
      Start
    </button>
  );
}

export default TimerButton;
