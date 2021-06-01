import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

const TimePicker = ({ max, min }) => {
  const [day, setDay] = useState('');
  const [days, setDays] = useState([
    max
  ]);

  useEffect(() => {
    const cMin = new Date(min.getTime());
    const cMax = new Date(max.getTime());

    cMax.setHours(0, 0, 0);
    cMin.setHours(0, 0, 0);

    if (cMin.getTime() === cMax.getTime()) {

    } else {
      setDays([
        min, max
      ])
    }

  }, [min, max])

  const [hours, setHours] = useState(min.getHours());
  const [minutes, setMinutes] = useState(min.getMinutes())

  return (
    <div className="fixed w-screen h-screen left-0 top-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="max-w-xs h-32 w-full rounded-3xl bg-white flex items-center overflow-hidden justify-around">
        <select value={day} onChange={(e) => setDay(e.target.value)}>
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
    </div>
  );
}

const Number = ({ value, onChange }) => (
  <input value={value} onChange={onChange} className="w-12 h-12 bg-purple-500 rounded-md text-xl text-center text-white" />
);

export default TimePicker;
