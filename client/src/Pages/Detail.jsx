import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import UserContext from '../UserContext';
import axios from 'axios';

function Detail() {
    let { id } = useParams();
    const { user } = useContext(UserContext);

    const [post, setPost] = useState({});

    useEffect(() => {
        const blog = document.getElementById('blog');
        axios({method:'GET', url:`http://localhost:5000/api/${id}`})
            .then(res => setPost(res.data))
            .catch(err => console.log(err));   
    }, []);

  return (
    <section>
        <h1>Blog Details</h1>
        <Link to={"update"}><p>Update</p></Link>
        <Link to={"delete"}><p>Delete</p></Link>
        <h2>{post.title}</h2>
        <div className='blog' id='blog' dangerouslySetInnerHTML={ {__html: post.content} } />
        <p>{post.published === false ? 'Unpublished' : 'Published'}</p>
    </section>
  )
}

export default Detail