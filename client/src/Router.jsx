import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import App from './App'
import Home from './Pages/home'

function Router() {

    const router = createBrowserRouter([
        {
            path: "/posts",
            element: <Home/>
        },
        {
            path: "/posts/login",
            element: <Login/>
        },
        {
            path: "/posts/register",
            element: <Register/>
        }
    ])

  return <RouterProvider router = {router} />
}

export default Router