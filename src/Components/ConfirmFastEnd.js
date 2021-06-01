import { useContext } from "react";
import { CurrentFastingContext } from "../Context/CurrentFastingContext";
import TimePicker from "./Timer/TimePicker";

const ConfirmFastEnd = ({ onConfirm }) => {
  const { startingTime } = useContext(CurrentFastingContext);
  return (
    <div className="max-w-lg w-full p-8 bg-white rounded-2xl shadow-2xl">
      <h3>Are you sure want to end the fast now?</h3>
      <h6>When did you had your last meal?</h6>
      <TimePicker
        max={new Date()}
        min={startingTime}
        onChange={(val) => {
          onConfirm({
            end: val
          })
          console.log(val)
        }}
        maxFailureMessage="End time cannot be later than current time"
        minFailureMessage="End time cannot be earlier than starting time"
      >
        <button>earlier</button>
      </TimePicker>
      <button onClick={() => onConfirm({
        end: new Date()
      })}>now</button>
    </div>
  );
};

export default ConfirmFastEnd;
