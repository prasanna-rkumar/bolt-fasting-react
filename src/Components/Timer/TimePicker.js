import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';

const TimePicker = ({ children, max, min, maxFailureMessage, minFailureMessage, onChange }) => {
  const [day, setDay] = useState(min.getTime());
  const [days, setDays] = useState([
    max
  ]);
  const [isOpen, setOpen] = useState(false)
  const [hours, setHours] = useState(min.getHours());
  const [minutes, setMinutes] = useState(min.getMinutes())

  const onSave = () => {
    const result = new Date(parseInt(day))
    result.setHours(hours);
    result.setMinutes(minutes);

    const dResult = dayjs(result);
    const dMax = dayjs(max);
    const dMin = dayjs(min);

    if (dMax.diff(result) < 0) {
      toast.warn(maxFailureMessage)
    } else if (dResult.diff(dMin) < 0) {
      toast.warn(minFailureMessage)
    } else {
      onChange(result);
      setOpen(false);
    }
  }

  const onCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    const cMin = new Date(min.getTime());
    const cMax = new Date(max.getTime());

    cMax.setHours(0, 0, 0, 0);
    cMin.setHours(0, 0, 0, 0);

    if (cMin.getTime() !== cMax.getTime()) {
      setDays([
        min, max
      ])
    }
  }, [min, max])

  return (
    <>
      <div className="inline" onClick={() => setOpen(true)}>{children}</div>
      <Modal onClose={() => setOpen(false)} isOpen={isOpen}>
        <div className="max-w-xs w-full rounded-3xl bg-white flex flex-col justify-between py-4 gap-y-4">
          <div className="flex items-center overflow-hidden justify-around">
            <select className="text-black text-xl border-2 focus:ring focus:ring-offset-purple-500 border-purple-200 p-1 rounded-md outline-none" value={day} onChange={(e) => setDay(e.target.value)}>
              {
                days.map((value) => (
                  <option key={value.getTime()} value={value.getTime()}>{dayjs(value).format("D, MMM")}</option>
                ))
              }
            </select>
            <div className="flex items-center gap-x-2">
              <Number value={hours} onChange={(e) => setHours(e.target.value)} />
              <span className="text-purple-500 text-6xl relative bottom-1">:</span>
              <Number value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-x-4 px-4">
            <Button onClick={onCancel} secondary>Cancel</Button>
            <Button onClick={onSave} primary>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

const Button = ({ children, primary, secondary, onClick }) => (
  <button onClick={onClick} className={`rounded-md text-sm py-1 px-3 ${primary && 'text-white bg-green-500'} ${secondary && ' text-black bg-gray-400'}`}>{children}</button>
)

const Number = ({ value, onChange }) => (
  <input value={value} onChange={onChange} className="w-12 h-12 bg-purple-500 rounded-md text-xl text-center text-white" />
);

export default TimePicker;
