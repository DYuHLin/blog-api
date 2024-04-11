import React, {useContext, useState, useRef} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';

function create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  const {user} = useContext(UserContext);

  const ContentRef = useRef();

  const showToken = (e) => {
    e.preventDefault();
    const checkBox = document.getElementById('publish');
    // const decoded = jwtDecode(user.accessToken)
    // console.log(decoded.user._id)
    console.log(ContentRef.current.getContent());
    let publishVal = false;
    if(checkBox.checked){
      setPublished(true);
    } else{
      setPublished(false);
    };
    console.log(published);
  }

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
  
    fetch('http://localhost:5000/api/create', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(post)
    }).then(() => {
      console.log("Posted");
    })
  };

  return (
    <section>
      <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
        <input type="text" required name='title' id='title' className='title' onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="body">Body: </label>
        <Editor apiKey='7b9bztrodn0kidftvkbg5tuk6lqiwpwtl934lt1s1av1ghzr' name="body" id="body" required className='body' 
          onInit={(evt, editor) => ContentRef.current = editor}/>
        <label htmlFor="publish">Publish: </label>
        <input type="checkbox" id='publish' name='publish' className='publish'/>
        <button>Post Blog</button>
      </form>
      <button onClick={showToken}>show token</button>
    </section>
  )
}

export default create