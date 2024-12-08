import { createBrowserRouter, Navigate } from "react-router-dom"
import Main from "../pages/main.js"
import Home from "../pages/home/index.js"
import Users from "../pages/user/index.js"
import Mall from "../pages/mall/index.js"
import Page1 from "../pages/other/page1.js"
import Page2 from "../pages/other/page2.js"
import Login from "../pages/login/index.js"

const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            //重定向
            {
                path: '/',
                element: <Navigate to='home' replace />//重定向

            },
            {
                path: 'home',
                Component: Home
            },

            {
                path: 'user',
                Component: Users
            },

            {
                path: 'mall',
                Component: Mall
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'page1',
                        Component: Page1
                    },
                    {
                        path: 'page2',
                        Component: Page2
                    }
                ]
            }
        ]
    },

    {
        path: '/login',
        Component: Login
    }

]

export default createBrowserRouter(routes)