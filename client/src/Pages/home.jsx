import React from 'react'
import { useEffect, useState } from 'react'

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

    </section>
  )
}

export default home