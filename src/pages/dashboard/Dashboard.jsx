import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-72 min-h-screen bg-[#FE654F] flex flex-col gap-10">
                <NavLink to='/dashboard/userProfile'>My Profile</NavLink>
                <NavLink to='/dashboard/addProducts'>Add Products</NavLink>
                <NavLink to='/dashboard/myProducts'>My Products</NavLink>
            </div>
            <div className="w-full min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;