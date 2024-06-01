import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Homepage from "../pages/home/Homepage";
import Products from "../pages/products/Products";
import Login from "../pages/authentication/Login";


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
                path: 'signin',
                element: <Login></Login>
            }
        ]
    }
])

export default router;