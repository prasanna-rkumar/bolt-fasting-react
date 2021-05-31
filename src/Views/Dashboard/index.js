import { useEffect } from "react";
import Navbar from "../../Components/Header";
import RecentFasts from "../../Components/RecentFasts";
import Timer from "../../Components/Timer";
import { CurrentFastingProvider } from "../../Context/CurrentFastingContext";

const Dashboard = () => {
  useEffect(() => {

  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-y-4 lg:flex-row justify-between gap-x-4">
        <CurrentFastingProvider>
          <Timer />
        </CurrentFastingProvider>
        <RecentFasts />
      </div>
    </>
  );
}

export default Dashboard;
