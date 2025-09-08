import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Cars from "../pages/Cars";
import Contact from "../pages/Contact";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/cars",
            element: <Cars />
        },
        {
            path: "/faq",
            element: <div>FAQ</div>
        },
        {
            path: "/cars/:id",
            element: <CarDetails />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/services/:service-type",
            element: <div>Service details</div>
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/admin",
            element: <Admin />
        },
        {
            path: "/account",
            element: <div>Account</div>
        }
    ]
)

export default router;