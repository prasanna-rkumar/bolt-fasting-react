import { useEffect } from "react";
import Navbar from "../../Components/Header";
import RecentFasts from "../../Components/RecentFasts";
import Timer from "../../Components/Timer";

const Dashboard = () => {
  useEffect(() => {

  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-y-4 lg:flex-row justify-between gap-x-4">
        <Timer />
        <RecentFasts />
      </div>
    </>
  );
}

export default Dashboard;
