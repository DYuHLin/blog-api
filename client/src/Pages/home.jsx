import React from 'react'
import { useEffect, useState } from 'react'
import '../assets/App.css'

function home() {

  const [posts, setPosts] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/posts").then(
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
        
      })}
    </section>
  )
}

export default home