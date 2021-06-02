import dayjs from "dayjs";
import { useRef } from "react";
import Bar from "./Bar";

const Graph = ({ data }) => {
  const graphRef = useRef(null);

  let longestFastDuration = 0,
    weekFastHours = 0,
    weekTotalFasts = 0;

  data.forEach((day) => {
    day.fasts.forEach((fast) => {
      weekFastHours += fast.fastDuration;
      weekTotalFasts += 1;
      if (longestFastDuration < fast.fastDuration)
        longestFastDuration = fast.fastDuration;
    })
  })

  let weekFastAverage = weekTotalFasts && weekFastHours / weekTotalFasts
  let xAxisUnits = [];

  if (longestFastDuration > 0) {
    longestFastDuration = Math.ceil(longestFastDuration)
    xAxisUnits.push(0)
    for (let i = 1; i <= 3; i++) {
      xAxisUnits.push(
        Math.ceil(longestFastDuration * i / 3)
      )
    }
  }

  return (
    <>
      <div className="flex justify-between items-end text-sm text-gray">
        <h4 className="flex flex-col">
          <span>Recent Fasts</span>
          <span className="text-2xl font-semibold text-black">Average {weekFastAverage.toFixed(1)}h</span>
        </h4>
        {
          (data && data.length > 0) && (
            <span>{dayjs(data[0].date).format("MMM D")} { data.length > 1 && ' - ' + dayjs(data[data.length - 1].date).format("MMM D")}</span>
          )
        }
      </div>
      <div className="flex gap-x-2 flex-1">
        <div className="flex flex-col-reverse justify-between pb-2">
          {
            xAxisUnits.map((value, index) => (
              <div key={index} className="text-xs text-gray">{value}h</div>
            ))
          }
        </div>
        <div ref={graphRef} className="flex-1 flex flex-nowrap overflow-x-auto">
          {
            data.map((fastData, index) => (
              <Bar index={index} key={fastData._id} fastData={fastData} longestFastDuration={longestFastDuration} />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Graph;
