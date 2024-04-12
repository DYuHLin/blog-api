import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import App from './App'
import Create from './Pages/create'
import Detail from './Pages/Detail'

function Router() {

    const router = createBrowserRouter([
        {
            path: "/posts",
            element: <App/>,
            // errorElement: <h1>404 Not Found</h1>
        },
        {
            path: "/posts/login",
            element: <Login/>,
        },
        {
            path: "/posts/register",
            element: <Register/>,
            errorElement: <h1>404 Not Found</h1>
        },
        {
            path: "/posts/create",
            element: <Create/>,
            errorElement: <h1>404 Not Found</h1>
        },
        {
            path: "/posts/:id",
            element: <Detail/>,
            errorElement: <h1>404 Not Found</h1>
        }
    ])

  return <RouterProvider router = {router} />
}

export default Router