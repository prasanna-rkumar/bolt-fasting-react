import { useContext } from 'react';
import { DashboardContext } from "../Context/DashboardContext";

const GeneralStats = () => {
  const { statsData } = useContext(DashboardContext)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 w-full bg-white rounded-3xl shadow-xl justify-items-center gap-y-8 py-4 items-center my-16" style={{ minHeight: 180 }}>
      { statsData &&
        Object.keys(statsData).map((key, index) => {
          return (
            <div key={key}>
              <div className="text-lg text-gray font-medium">{key}</div>
              <div className="text-4xl font-medium text-center md:text-left">{statsData[key]}</div>
            </div>
          )
        })
      }
    </div>
  );
};

export default GeneralStats;
