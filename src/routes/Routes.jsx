import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Homepage from "../pages/home/Homepage";
import Products from "../pages/products/Products";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AddProducts from "../pages/dashboard/user/AddProducts";
import MyProducts from "../pages/dashboard/user/MyProducts";
import ProductsReview from "../pages/dashboard/moderator/ProductsReview";
import ReportedContents from "../pages/dashboard/moderator/ReportedContents";
import DashboardAdmin from "../pages/dashboard/admin/DashboardAdmin";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageCoupon from "../pages/dashboard/admin/ManageCoupon";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/signin',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            // user routes
            {
                path:'/dashboard/userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/dashboard/addProducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/myProducts',
                element: <MyProducts></MyProducts>
            },

            // moderator routes
            {
                path: '/dashboard/productsReview',
                element: <ProductsReview></ProductsReview>
            },
            {
                path: '/dashboard/reportedContents',
                element: <ReportedContents></ReportedContents>
            },

            // admin routes
            {
                path: '/dashboard/adminDashboard',
                element: <DashboardAdmin></DashboardAdmin>
            },
            {
                path: '/dashboard/manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: '/dashboard/manageCoupon',
                element: <ManageCoupon></ManageCoupon>
            }
        ]
    }
])

export default router;