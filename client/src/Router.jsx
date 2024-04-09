import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import App from './App'
import Create from './Pages/create'

function Router() {

    const router = createBrowserRouter([
        {
            path: "/posts",
            element: <App/>
        },
        {
            path: "/posts/login",
            element: <Login/>
        },
        {
            path: "/posts/register",
            element: <Register/>
        },
        {
            path: "/posts/create",
            element: <Create/>
        }
    ])

  return <RouterProvider router = {router} />
}

export default Router