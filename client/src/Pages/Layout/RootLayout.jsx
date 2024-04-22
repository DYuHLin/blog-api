import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/App.css'
import UserContext from '../../UserContext';

function RootLayout() {

  const { user } = useContext(UserContext);

  return (
    <div className="root-layout">
        <header>
            <h3 className='header-title'>Blog</h3>

            <div className="header-links">
                <NavLink to="/posts">Home</NavLink>
                
                {
                    user ?  <NavLink to="/posts/create">Create</NavLink> : ''
                }
                {
                    user ?  <NavLink to="/posts/userblogs">Your blogs</NavLink> : ''
                }
                {
                    !user ?  <NavLink to="/posts/login">Login</NavLink> : ''
                }
            </div>
        </header>

        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout