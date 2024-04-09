import React, {useState} from 'react'
import { Editor } from '@tinymce/tinymce-react'

function create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault();
    const post = {title, content, published};
  
    fetch('http://localhost:5000/posts/create', {
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
        <Editor apiKey='7b9bztrodn0kidftvkbg5tuk6lqiwpwtl934lt1s1av1ghzr' name="body" id="body" required className='body' onChange={(e) => setContent(e.target.value)}/>
        <label htmlFor="publish">Publish: </label>
        <input type="checkbox" id='publish' name='publish' className='publish' onChange={(e) => setPublished(e.target.value)}/>
        <button>Post Blog</button>
      </form>
      
    </section>
  )
}

export default create