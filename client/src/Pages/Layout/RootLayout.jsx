import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/App.css'
import UserContext from '../../UserContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function RootLayout() {

  const { user, setUser } = useContext(UserContext);
  const getUserDecoded = () => {
    return user === false ? false : jwtDecode(user.accessToken);
  };

  const [decodedUser, setDecodedUser] = useState(getUserDecoded);

  const refreshToken = async () => {
    try{
        const res = await axios.post("http://localhost:5000/api/refresh", { token: user.refreshToken });
        setUser({
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
        });

    } catch(err){
        console.log(err);
    };
  };

  const logout = async () => {
    const token = { token: user.refreshToken };
    fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + user.accessToken
            },
        body: JSON.stringify(token)
    });
    setUser(false);
  };

  return (
    <div className="root-layout">
        <header>
            <p className='header-title'>Blog</p>

            <div className="header-links">
                <NavLink to="/posts" className="head-link">Home</NavLink>
                
                {
                    user ?  <NavLink to="/posts/create" className="head-link">Create</NavLink> : ''
                }
                {
                    user ?  <a onClick={logout} className='head-link'>Logout</a> : ''
                }
                {
                    user ?  <NavLink to="/posts/userblogs" className="head-link">{decodedUser.user.username}</NavLink> : ''
                }
                {
                    !user ?  <NavLink to="/posts/login" className="head-link">Login</NavLink> : ''
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