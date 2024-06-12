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
import Details from "../pages/viewDetails/Details";
import PrivateRoute from "../private/PrivateRoute"
import ModeratorRoute from "../private/ModeratorRoute";
import AdminRoute from "../private/AdminRoute";
import Payment from "../pages/payment/Payment";

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
            },
            {
                path: '/viewDetails/:id',
                element: <PrivateRoute><Details></Details></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // user routes
            {
                path: '/dashboard/userProfile',
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
            {
                path: '/dashboard/makePayment/amount/:amount',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },

            // moderator routes
            {
                path: '/dashboard/productsReview',
                element: <ModeratorRoute><ProductsReview></ProductsReview></ModeratorRoute>
            },
            {
                path: '/dashboard/reportedContents',
                element: <ModeratorRoute><ReportedContents></ReportedContents></ModeratorRoute>
            },

            // admin routes
            {
                path: '/dashboard/adminDashboard',
                element: <AdminRoute><DashboardAdmin></DashboardAdmin></AdminRoute>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: '/dashboard/manageCoupons',
                element: <AdminRoute><ManageCoupon></ManageCoupon></AdminRoute>
            }
        ]
    }
])

export default router;