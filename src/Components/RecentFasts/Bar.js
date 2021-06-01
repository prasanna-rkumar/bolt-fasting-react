import dayjs from "dayjs";

const Bar = ({ fastData, longestFastDuration }) => {
  const difference = ( (
    dayjs(fastData.endedAt).diff(dayjs(fastData.startedAt))
  ) / 1000 / 60 / 60 )
  return (
    <div key={fastData._id} style={{ width: 90, minWidth: 90 }} className="h-full border-l border-r border-gray-200 flex flex-col justify-end items-center">
      <div style={{ height: `${difference / longestFastDuration * 100}%` }} className="w-3 bg-green-400 rounded-full" />
      <span className="text-xs font-light text-gray-500">{dayjs(fastData.date).format('MMM D')}</span>
    </div>
  );
};

export default Bar;
