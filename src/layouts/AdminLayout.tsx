import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/core/Sidebar";
import DashboardNavbar from "../components/core/DashbaordNavbar";
import { useAuth } from "../context/AuthProvider";
import { LoadingOutlined } from "@ant-design/icons";
import { UserAuraProvider } from "../context/UserAuraContext";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { accessToken, loading } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (!loading) {
            if (!accessToken) {
                navigate('/auth/login');
            }
        }
    }, [accessToken, loading, navigate]);

    const customLoader = (
        <div className="flex flex-col justify-center items-center h-[60vh]">
            <div className="relative">
                <LoadingOutlined
                    style={{ fontSize: 48, color: '#00FFFF' }}
                    spin
                />
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
            </div>
            <div className="text-cyan-300 font-mono mt-4 text-lg">LOADING.ENTITIES...</div>
        </div>
    );

    if (loading) return customLoader;

    if (!accessToken) return customLoader;

    return (
        <UserAuraProvider>
        <div className="w-full min-h-screen bg-black flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-40">
                <DashboardNavbar />
            </div>

            <div className="flex flex-1 pt-16">
                <Sidebar />

                <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide px-3 sm:px-6 py-4 sm:py-6 [@media(max-width:350px)]:px-0 [@media(max-width:350px)]:py-0">
                    <div className="bg-black rounded-xl sm:rounded-2xl min-h-full px-3 py-4 sm:p-6 shadow-lg mt-2 sm:mt-4 [@media(max-width:400px)]:px-0 [@media(max-width:400px)]:py-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        </UserAuraProvider>
    );
};

export default AdminLayout;