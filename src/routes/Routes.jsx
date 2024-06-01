import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Homepage from "../pages/home/Homepage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>
            }
        ]
    }
])

export default router;