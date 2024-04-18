import React from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RootLayout from './Pages/Layout/RootLayout'
import Create from './Pages/create'
import Detail from './Pages/Detail'
import Delete from './Pages/Delete'
import Update from './Pages/Update'
import Home from './Pages/Home'

function Router() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/posts' element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path='/posts/login' element={<Login />} />
                <Route path='/posts/register' element={<Register />} />
                <Route path='/posts/create' element={<Create />} />
                <Route path='/posts/:id' element={<Detail />} />
                <Route path='/posts/:id/update' element={<Update />} />
                <Route path='/posts/:id/delete' element={<Delete />} />
            </Route>
        )
    //     [
    //     {
    //         path: "/posts",
    //         element: <App/>,
    //         errorElement: <h1>404 Not Found</h1>,
    //     },
    //     {
    //         path: "/posts/login",
    //         element: <Login/>,
    //     },
    //     {
    //         path: "/posts/register",
    //         element: <Register/>,
    //         errorElement: <h1>404 Not Found</h1>
    //     },
    //     {
    //         path: "/posts/create",
    //         element: <Create/>,
    //         errorElement: <h1>404 Not Found</h1>
    //     },
    //     {
    //         path: "/posts/:id",
    //         element: <Detail/>,
    //         errorElement: <h1>404 Not Found</h1>
    //     },
    //     {
    //         path: "/posts/:id/update",
    //         element: <Update/>,
    //         errorElement: <h1>404 Not Found</h1>
    //     },
    //     {
    //         path: "/posts/:id/delete",
    //         element: <Delete/>,
    //         errorElement: <h1>404 Not Found</h1>
    //     }
    // ]
)

  return <RouterProvider router = {router} />
}

export default Router