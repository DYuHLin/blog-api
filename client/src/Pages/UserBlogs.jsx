import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserBlogs() {
    const [posts, setPosts] = useState([{}]);
    const { user, setUser } = useContext(UserContext);
    const [visibility, setVisibility] = useState("hidden");

    const getUserDecoded = () => {
      return user === false ? false : jwtDecode(user.accessToken);
    };
  
    const [decodedUser, setDecodedUser] = useState(getUserDecoded);
    const navigate = useNavigate();

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

    const deleteUser = () => {
      const userId = {id: decodedUser.user._id};
      fetch("http://localhost:5000/api/logout/delete", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + user.accessToken
              },
          body: JSON.stringify(userId)
      });
      setUser(false);
      navigate('/posts');
    };

    useEffect(() => {
        const decoded = jwtDecode(user.accessToken);
        fetch(`http://localhost:5000/api/user/${decoded.user._id}`).then(
          res => res.json()
        ).then(data => {
          setPosts(data);
          }
        );
        
      }, []);

  return (
    <section>
      <h1>{decodedUser.user.username}</h1>
      <div className='detail-link'>
            <a onClick={logout} className='head-link'>Logout</a>
            <a onClick={() => setVisibility("")} className='head-link'>Delete account</a>
      </div>
      <button className={visibility} onClick={deleteUser}>Are you sure?</button>
      {posts.map((blog) => {
        return(
          <Link to={`/posts/${blog._id}`} className="blog blog-title-home">    
            <h3 className="blog-title-home">{blog.title}</h3>
            <br/>
            <span className="blog-title-home">{new Date(blog.date).toLocaleString()}</span>
            <p className="blog-title-home">{blog.published === false ? 'Unpublished' : 'Published'}</p>
            {/* <p>{blog.user.name}</p> */}
          </Link>
        )
      })}
    </section>
  )
}

export default UserBlogs