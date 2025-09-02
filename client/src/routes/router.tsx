import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Cars from "../pages/Cars";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import CarDetails from "../pages/CarDetails";


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
            path: "/services",
            element: <Services />
        },
        {
            path: "/services/:service-type",
            element: <div>Service details</div>
        },
        {
            path: "/login",
            element: <div>Login</div>
        },
        {
            path: "/register",
            element: <div>Register</div>
        },
        {
            path: "/admin",
            element: <div>Admin</div>
        },
        {
            path: "/account",
            element: <div>Account</div>
        }
    ]
)

export default router;