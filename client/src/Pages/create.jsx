import React from 'react'
import TextEditor from '../Components/TextEditor'
import { Editor } from '@tinymce/tinymce-react'

function create() {
  return (
    <section>
      <form method="POST">
      <label htmlFor="title">Title: </label>
        <input type="text" required name='title' id='title' className='title' onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="body">Body: </label>
        <textarea name="body" id="body" cols="30" rows="10" required className='body'></textarea>
        <Editor apiKey='7b9bztrodn0kidftvkbg5tuk6lqiwpwtl934lt1s1av1ghzr' />
        <button>Post Blog</button>
      </form>
      
    </section>
  )
}

export default create