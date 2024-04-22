import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserBlogs() {
    const [posts, setPosts] = useState([{}]);
    const { user } = useContext(UserContext);

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
      <h1>Home</h1>
      {posts.map((blog) => {
        return(
          <Link to={`${blog._id}`}>
            <div className="blog">
            <h3>{blog.title}</h3>
            <span>{blog.date}</span>
            {/* <p>{blog.user.name}</p> */}
          </div>
        </Link>
        )
      })}
    </section>
  )
}

export default UserBlogs