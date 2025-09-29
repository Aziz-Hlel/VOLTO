import { Sidebar } from "@/components/SideBar/sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-screen fixed inset-0 overflow-hidden ">
      <Sidebar />

      <div className=" w-full  overflow-y-scroll max-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
