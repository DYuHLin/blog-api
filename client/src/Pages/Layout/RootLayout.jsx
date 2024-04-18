import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/App.css'

function RootLayout() {
  return (
    <div className="root-layout">
        <header>
            <h3 className='header-title'>Blog</h3>

            <div className="header-links">
                <NavLink to="/posts">Home</NavLink>
                <NavLink to="/posts/create">Create</NavLink>
            </div>
        </header>

        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout