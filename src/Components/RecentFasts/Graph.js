import dayjs from "dayjs";
import { useRef } from "react";
import Bar from "./Bar";

const Graph = ({ data }) => {
  const graphRef = useRef(null);
  let longestFastDuration = data.reduce((accumulator, current) => {
    const currentDuration = dayjs(current.endedAt).diff(dayjs(current.startedAt));
    return accumulator > currentDuration ? accumulator : currentDuration
  }, 0);
  longestFastDuration = (longestFastDuration / 1000 / 60 / 60);

  let xAxisUnits = [];

  if (longestFastDuration > 0) {
    xAxisUnits.push(0)
    for (let i = 1; i <= 3; i++) {
      xAxisUnits.push(
        Math.floor(longestFastDuration * i / 3)
      )
    }
  }

  return (
    <div className="flex gap-x-2 flex-1">
      <div className="flex flex-col-reverse justify-between pb-2">
        {
          xAxisUnits.map((value) => (
            <div key={value} className="text-xs text-gray-500">{value}h</div>
          ))
        }
      </div>
      <div ref={graphRef} className="flex-1 flex flex-nowrap overflow-x-auto pb-2">
        {
          data.map((fastData) => (
            <Bar key={fastData._id} fastData={fastData} longestFastDuration={longestFastDuration} />
          ))
        }
      </div>
    </div>
  );
};

export default Graph;
