import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

function App() {
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

export default App
