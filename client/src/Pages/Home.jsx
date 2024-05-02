import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';

function Home() {
  const [posts, setPosts] = useState([{}]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      res => res.json()
    ).then(data => {
      setPosts(data);
      }
    );
    
  }, []);

  return (
    <section>
      <h1 className='home-title'>Welcome to my blog site</h1>
      {posts.map((blog) => {
        return(
            <div className="blog2" key={blog._id}>
              <Link to={`${blog._id}`} className="blog-title-home">
            <h3 className="blog-title-home">{blog.title}</h3>
            <span className="blog-title-home">{blog.date}</span>
            {/* <p>{blog.user.username}</p>  */}
            </Link>
          </div>
        )
      })}
    </section>
  )
}

export default Home
