import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';

function Home() {
  const [posts, setPosts] = useState([{}]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const data = window.localStorage.getItem("BLOG_USER");
    setUser(JSON.parse(data));

    fetch("http://localhost:5000/api").then(
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
            <div className="blog" key={blog._id}>
              <Link to={`${blog._id}`}>
            <h3>{blog.title}</h3>
            <span>{blog.date}</span>
            {/* <p>{blog.user.username}</p>  */}
            </Link>
          </div>
        )
      })}
    </section>
  )
}

export default Home
