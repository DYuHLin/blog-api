import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';

function Home() {
  const [posts, setPosts] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      res => res.json()
    ).then(data => {
      setPosts(data);
      }
    );
    
  }, []);

  const show = () => {
    console.log(posts)
  }

  return (
    <section>
      <h1 className='home-title'>Welcome to my blog site</h1>
      {posts === false ? <p>There are no posts</p> :
      posts.map((blog) => {
        return(
          <Link key={blog._id} to={`${blog._id}`} className="blog blog-title-home">
              
            <h3 className="blog-title-home">{blog.title}</h3>
            <br/>
            <span className="blog-title-home">{new Date(blog.date).toLocaleString()}</span>
            <p>{blog.user.username}</p>   
            
          </Link>
        )
      })}
      <button onClick={show}>show</button>
    </section>
  )
}

export default Home
