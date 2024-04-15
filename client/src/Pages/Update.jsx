import React, { useContext, useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

function Update() {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState({});

  const {user} = useContext(UserContext);
  let { id } = useParams();

  const ContentRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    const checkBox = document.getElementById('publish');
    const decoded = jwtDecode(user.accessToken);
    let publishVal = false;
    if(checkBox.checked){
      publishVal = true;
    } else{
      publishVal = false;
    };

    const post = {user: decoded.user._id, title: title, content: ContentRef.current.getContent(), published: publishVal};
  
    fetch(`http://localhost:5000/api/${id}/update`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(post)
    }).then(() => {
      navigate('/posts');
      console.log("Posted");
    })
  };

  useEffect(() => {
    axios({method:'GET', url:`http://localhost:5000/api/${id}`})
        .then(res => {
          setPost(res.data);
          setTitle(res.data.title)
        })
        .catch(err => console.log(err));   
}, []);

  return (
    <section>
      <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
        <input type="text" required name='title' id='title' className='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="body">Body: </label>
        <Editor apiKey='7b9bztrodn0kidftvkbg5tuk6lqiwpwtl934lt1s1av1ghzr' name="body" id="body" required className='body' 
          onInit={(evt, editor) => ContentRef.current = editor}
          initialValue= {post.content}/>
        <label htmlFor="publish">Publish: </label>
        <input type="checkbox" id='publish' name='publish' className='publish'/>
        <button>Post Blog</button>
      </form>
    </section>
  )
}

export default Update