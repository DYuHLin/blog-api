import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import UserContext from '../UserContext';
import axios from 'axios';
import WriteComment from '../Components/WriteComment';
import Comments from '../Components/Comments';
import { jwtDecode } from 'jwt-decode';

function Detail() {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    const getUserDecoded = () => {
      return user === false ? false : jwtDecode(user.accessToken);
    };

    const [post, setPost] = useState(false);
    const [comments, setComments] = useState([]);
    const [decodedUser, setDecodedUser] = useState(getUserDecoded);

    useEffect(() => {
        axios({method:'GET', url:`http://localhost:5000/api/${id}`})
            .then(res => setPost(res.data))
            .catch(err => console.log(err));  
            
        axios({method:'GET', url:`http://localhost:5000/api/${id}/comments`})
            .then(res => setComments(res.data))
            .catch(err => console.log(err)); 

        
    }, [comments]);
    
const show = (e) => {
  e.preventDefault()
  fetch(`http://localhost:5000/api/${id}/comments`).then(
    res => res.json()
    ).then(data => {
     console.log(data);
      }
    );
}
  return (
    <section>
        <h1>Blog Details</h1>
        {!post ? (""):
        post.user._id === decodedUser.user._id ? (
          <>
            <Link to={"update"}><p>Update</p></Link>
            <Link to={"delete"}><p>Delete</p></Link>
          </>
        ) : ""
      }
        
        <h2>{post.title}</h2>
        <div className='blog' id='blog' dangerouslySetInnerHTML={ {__html: post.content} } />
        <p>{post.published === false ? 'Unpublished' : 'Published'}</p>
        <WriteComment paramId = {id} post = {post}/>
        <Comments paramId = {id} post = {post} comments = {comments}/> 
        <button onClick={show}>show</button>
    </section>
  )
}

export default Detail