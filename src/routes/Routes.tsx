import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, ThemeConfig } from 'antd';
import { ChatProvider } from "../context/ChatProvider";
import LeadershipBoard from "../pages/user/LeadershipBoard";

// layouts
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Layout = lazy(() => import("../layouts/Layout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const WebLayout = lazy(() => import("../layouts/WebLayout"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));
const AIGurusLayout = lazy(() => import("../layouts/AIGurusLayout"));

// web pages
const Home = lazy(() => import("../pages/web/Home"));
const Blogs = lazy(() => import("../pages/web/Blogs"));
const Chats = lazy(() => import("../pages/web/Chats"));

// auth pages
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPssword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));

// admin pages
const Dashboard = lazy(() => import("../pages/admin/Dashbaord"));
const BlogEditorPage = lazy(() => import("../pages/admin/CreateBlog"));
const ManageCategories = lazy(() => import("../pages/admin/ManageCategories"));
const RolesManagement = lazy(() => import("../pages/admin/RolesManagement"));
const ReportsManagement = lazy(() => import("../pages/admin/ReportsManagement"));
const BlogDetails = lazy(() => import("../pages/admin/BlogDetails"));
const ThreadsManagement = lazy(() => import("../pages/admin/ThreadsManagement"));
const BlogsManagement = lazy(() => import("../pages/admin/BlogsManagement"));
const UserActivityLogs = lazy(() => import("../pages/user/UserActivityLogs"));

// userDashboard pages
const Dashbaord = lazy(() => import("../pages/user/Dashboard"));
const AnamCoinsRedeem = lazy(() => import("../pages/user/anamcoins"));
const Referrals = lazy(() => import("../pages/user/anamcoins"));

// other pages
const IntroHome = lazy(() => import("../pages/landing/IntroHome"));
const GetStarted = lazy(() => import("../pages/landing/GetStarted"));
const CommingSoon = lazy(() => import("../pages/ComingSoon"));
const AiGurus = lazy(() => import("../pages/landing/AiGurus"));

const router = createBrowserRouter([
    // Intro pages
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <IntroHome /> },
            { path: "startup-page", element: <GetStarted /> },
            { path: "startup-page", element: <GetStarted /> },
        ],
    },
    // auth pages
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "verify-email", element: <VerifyEmail /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },

        ],
    },
    // web pages
    {
    path: "/",
    element: <WebLayout />,
    children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <CommingSoon /> },
        { path: "solutions", element: <CommingSoon /> },
        { path: "features", element: <CommingSoon /> },
        { path: "reachout", element: <CommingSoon /> },
        { path: "blogs", element: <Blogs /> },
        {
            path: "membership",
            element: (
                <ChatProvider>
                    <Chats />
                </ChatProvider>
            )
        },
       
    ],
},
    // AI Gurus pages
     {
        path: "/ai-gurus",
        element: <AIGurusLayout />,
        children: [
            { path: "", element: <AiGurus /> },
        ],
    },
    // admin pages
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [

            { path: "dashboard", element: <Dashboard /> }, // optional route (/admin/dashboard)
            // { path: "home", element: <AdminHome /> },
            { path: "blogs", element: <BlogsManagement /> },
            { path: "blogs/blog-details/:id", element: <BlogDetails /> },
            { path: "blogs/create", element: <BlogEditorPage /> },
            { path: "blogs/edit/:id", element: <BlogEditorPage /> },
            { path: "users", element: <RolesManagement /> },
            { path: "thread-categories", element: <ManageCategories /> },
            { path: "threads", element: <ThreadsManagement /> },
            { path: "reports", element: <ReportsManagement /> },
        ],
    },
    // user dashboard pages
    {
        path: "/user",
        element: <UserLayout />,
        children: [
            { path: "dashboard", element: <Dashbaord /> }, // /user/dashboard
            { path: "anamcoins", element: <AnamCoinsRedeem /> }, // /user/anamcoins
            { path: "user-activity-logs", element: <UserActivityLogs /> },
            { path: "referrals", element: <Referrals /> },       // /user/referrals
            { path: "leadership-board", element: <LeadershipBoard /> },],
    },
]);

export default function AppRouter() {
    const antdTheme: ThemeConfig = {
        token: {
            colorPrimary: '#A0FF06',
            colorBgContainer: '#1b1b1b',
            colorBgElevated: '#272727',
            colorText: '#ffffff',
            colorTextSecondary: '#a0a0a0',
            colorBorder: '#333333',
            borderRadius: 4,
        },
        components: {
            Table: {
                headerBg: '#272727',
                headerColor: '#ffffff',
                rowHoverBg: '#272727',
                borderColor: '#333333',
                cellPaddingBlock: 12,
            },
            Dropdown: {
                colorBgElevated: '#272727',
            },
            Pagination: {
                colorPrimary: '#ffffff',
                colorPrimaryHover: '#ffffff',
                colorPrimaryBorder: '#ffffff',
                colorBorder: '#ffffff',
                colorText: '#ffffff',
                colorBgTextHover: 'rgba(255, 255, 255, 0.12)',
                colorBgTextActive: 'rgba(255, 255, 255, 0.08)',
            }
        }
    };

    return (
        <AuthProvider>
            <ConfigProvider theme={antdTheme}>
                <RouterProvider router={router} />
                <ToastContainer position="top-right" theme="dark" autoClose={3000} />
            </ConfigProvider>
        </AuthProvider>
    );
}