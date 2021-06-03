import dayjs from "dayjs";
import getGoalHoursFromGoalString from '../../utils/getGoalHoursFromGoalString'

const Bars = ({ fastData, longestFastDuration, index }) => {
  return (
    <div key={fastData._id} style={{ width: 90, minWidth: 90 }} className="h-full flex flex-col justify-end items-center">
      <div className={`flex flex-row h-full items-end gap-x-1 border-r-2 border-gray-100 w-full justify-center ${index === 0 && 'border-l-2'}`}>
        {
          fastData.fasts.map((fast) => (
            <Bar key={fast._id} fast={fast} longestFastDuration={longestFastDuration} />
          ))
        }
      </div>
      <span className="text-xs font-light text-gray">{dayjs(fastData.date).format('MMM D')}</span>
    </div>
  );
};

const Bar = ({ fast, longestFastDuration }) => {
  const goalHours = getGoalHoursFromGoalString(fast.goal);
  let color;

  let barHeight = (fast.fastDuration / longestFastDuration * 100);
  barHeight = barHeight > 0 ? barHeight : 1

  if (!fast.endedAt) {
    color = 'bg-secondary';
  } else if (fast.fastDuration >= goalHours - (goalHours * 40 / 100)) {
    color = 'bg-green';
  } else {
    color = 'bg-gray';
  }
  return (
    <div style={{ height: `${barHeight}%` }} className={`w-3 rounded-full ${color}`}>
    </div>
  );
}

export default Bars;
