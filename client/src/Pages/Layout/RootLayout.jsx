import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../../assets/App.css'
import UserContext from '../../UserContext';
import axios from 'axios';

function RootLayout() {

  const { user, setUser } = useContext(UserContext);

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

  useEffect(() => {
    const data = window.localStorage.getItem("BLOG_USER");
    setUser(JSON.parse(data));
  },[]);

//   useEffect(() => {
//     window.localStorage.setItem('BLOG_USER', JSON.stringify(user));
//   }, [user]);

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
                    user ?  <button onClick={logout}>Logout</button> : ''
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