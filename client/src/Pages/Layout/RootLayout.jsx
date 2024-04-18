import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="root-layout">
        <header>
            <h3>Blog</h3>

            <NavLink to="/posts">Home</NavLink>
            <NavLink to="/posts/create">Create</NavLink>
        </header>

        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout