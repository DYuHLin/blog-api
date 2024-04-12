import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../UserContext';
import axios from 'axios';

function Detail() {
    let { id } = useParams();
    const { user } = useContext(UserContext);

    const [post, setPost] = useState({});

    useEffect(() => {
        axios({method:'GET', url:`http://localhost:5000/api/${id}`}).then(res => setPost(res.data)).catch(err => console.log(err));   
    }, []);

  return (
    <section>
        <h1>Blog Details</h1>
        <h2>{post.title}</h2>
        <div>
            {post.content}
        </div>
    </section>
  )
}

export default Detail