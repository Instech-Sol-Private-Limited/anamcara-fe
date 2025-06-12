import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/web/Footer";

const AIGurusLayout = () => {
    const location = useLocation();
    const show = location.pathname === "/home";

    return (
        <div className="w-full overflow-y-auto relative flex flex-col justify-center items-center">
           
            <div className="w-full">
                <Outlet />
            </div>
            {show && <Footer />}
        </div>
    );
};

export default AIGurusLayout;