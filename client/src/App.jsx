import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'

function App() {
  const [posts, setPosts] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      res => res.json()
    ).then(data => {
      setPosts(data);
      }
    );
    
  }, []);

  const showData = () => {
    console.log(posts)
  }
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
      <button onClick={showData}>show</button>
    </section>
  )
}

export default App
