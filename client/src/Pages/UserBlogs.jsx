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
      <h1>Your Blogs</h1>
      {posts.map((blog) => {
        return(
          
            <div className="blog">
              <Link to={`/posts/${blog._id}`}>
              <h3>{blog.title}</h3>
              <span>{blog.date}</span>
              <p>{blog.published === false ? 'Unpublished' : 'Published'}</p>
              {/* <p>{blog.user.name}</p> */}
            </Link>
          </div>
        
        )
      })}
    </section>
  )
}

export default UserBlogs