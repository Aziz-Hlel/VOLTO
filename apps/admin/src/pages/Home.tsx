import { Sidebar } from "@/components/SideBar/sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen ">
      <Sidebar />

      <div className=" w-full  overflow-y-scroll h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
