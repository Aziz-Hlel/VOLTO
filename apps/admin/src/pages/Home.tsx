import { Sidebar } from "@/components/SideBar/sidebar";
import { Outlet, useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();

    return (
        <>

            <Sidebar />

            <Outlet />

        </>
    )
}

export default Home