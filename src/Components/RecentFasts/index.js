import { useQuery } from "../../hooks/axios-query";
import Graph from "./Graph";

const RecentFasts = () => {
  const [{ data }] = useQuery('/week/fasts');

  return (
    <div className="h-96 w-full rounded-3xl bg-white shadow-xl flex flex-col justify-start justify-items-stretch p-2.5 px-5 gap-y-4">
      <div className="">
        <h4 className="flex flex-col">
          <span className="text-gray-500">Recent Fasts</span>
          <span className="text-2xl font-semibold ">Average 14.4h</span>
        </h4>
      </div>
      { data && (
        <Graph data={data} />
      ) }
    </div>
  );
};

export default RecentFasts;
