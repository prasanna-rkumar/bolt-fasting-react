import { useContext } from "react";
import { CurrentFastingContext } from "../Context/CurrentFastingContext";
import Button from "./Button";
import TimePicker from "./Timer/TimePicker";

const ConfirmFastEnd = ({ onConfirm }) => {
  const { startingTime } = useContext(CurrentFastingContext);
  return (
    <div className="max-w-lg w-full p-4 bg-white rounded-2xl shadow-2xl">
      <div>
        <h3 className="font-medium text-gray-500">Ending Fast</h3>
        <h6 className="text-2xl font-semibold">When did you had your last meal?</h6>
      </div>
      <div className="flex gap-x-4 justify-end mt-3">
        <TimePicker
          max={new Date()}
          min={startingTime}
          onChange={(val) => {
            onConfirm({
              end: val
            })
          }}
          maxFailureMessage="End time cannot be later than current time"
          minFailureMessage="End time cannot be earlier than starting time"
        >
          <Button secondary>earlier</Button>
        </TimePicker>
        <Button onClick={() => onConfirm({
          end: new Date()
        })} primary>now</Button>
      </div>
    </div>
  );
};

export default ConfirmFastEnd;
