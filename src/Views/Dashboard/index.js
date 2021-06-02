import GeneralStats from "../../Components/GeneralStats";
import Navbar from "../../Components/Header";
import RecentFasts from "../../Components/RecentFasts";
import Timer from "../../Components/Timer";
import { CurrentFastingProvider } from "../../Context/CurrentFastingContext";
import { DashboardProvider } from "../../Context/DashboardContext";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <DashboardProvider>
        <div className="flex flex-col items-center gap-y-4 lg:flex-row justify-between gap-x-4">
          <CurrentFastingProvider>
            <Timer />
          </CurrentFastingProvider>
          <RecentFasts />
        </div>
        <GeneralStats />
      </DashboardProvider>
    </>
  );
}

export default Dashboard;
