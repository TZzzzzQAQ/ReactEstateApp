import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import SignIn from "@/pages/SignIn.jsx";
import SignUp from "@/pages/SignUp.jsx";
import Profile from "@/pages/Profile.jsx";
import About from "@/pages/About.jsx";
import AuthRoute from "@/components/AuthRoute.jsx";
import {CreateListing} from "@/pages/CreateListing.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
    },
    {
        path: '/sign-in',
        element: <SignIn/>
    },
    {
        path: '/sign-up',
        element: <SignUp/>
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/profile',
        element: <AuthRoute><Profile/></AuthRoute>
    },
    {
        path: '/create-listing',
        element: <AuthRoute><CreateListing/></AuthRoute>
    }
], {
    basename: '/estate'
})
export default router;