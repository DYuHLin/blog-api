import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import '../../assets/App.css'
import UserContext from '../../UserContext'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function RootLayout() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try{
        const res = await axios.post("http://localhost:5000/api/refresh", { token: user.refreshToken });
        setUser({
            ...user,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
        });
        return res.data;
    } catch(err){
        console.log(err);
    };
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
        let currentDate = new Date();
        const decodedToken = jwtDecode(user.accessToken);
        if(decodedToken.exp * 1000 < currentDate.getTime()){
            const data = await refreshToken();
            config.headers['authorization'] = "Bearer " + data.accessToken;
            // setUser(false);
            // navigate("/posts/login");
        };
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
  );

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
            <p className='header-title'><NavLink to="/posts" className="head-link">Blog</NavLink></p>

            <div className="header-links">
                <ul>
                    {
                        user ?  <li><NavLink to="/posts/create" className="head-link">Create</NavLink></li> : ''
                    }
                    {
                        user ?  <li><a onClick={logout} className='head-link'>Logout</a></li> : ''
                    }
                    {
                        user ?  <li><NavLink to="/posts/userblogs" className="head-link">{jwtDecode(user.accessToken).user.username}</NavLink></li> : ''
                    }
                    {
                        !user ?  <li><NavLink to="/posts/login" className="head-link">Login</NavLink></li> : ''
                    }
                </ul>
                
            </div>
        </header>

        <main>
            <Outlet />
        </main>     
    </div>
  )
}

export default RootLayout