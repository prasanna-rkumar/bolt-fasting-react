import { useContext } from "react";
import { DashboardContext } from "../../Context/DashboardContext";
import Graph from "./Graph";

const RecentFasts = () => {
  const { weekData } = useContext(DashboardContext)

  return (
    <div style={{
      height: 360
    }} className="w-full rounded-3xl bg-white shadow-xl flex flex-col justify-start justify-items-stretch p-2.5 px-5 gap-y-4">
      { weekData && (
        <Graph data={weekData} />
      )}
    </div>
  );
};

export default RecentFasts;
