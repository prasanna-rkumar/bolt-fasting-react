import { createContext } from "react";
import { useQuery } from "../hooks/axios-query";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [{ data: weekData }, refetchWeekData] = useQuery('/week/fasts');
  const [{ data: statsData }, refetchStats] = useQuery('/stats');

  return (
    <DashboardContext.Provider value={{
      weekData,
      statsData,
      refetchWeekData,
      refetchStats
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
