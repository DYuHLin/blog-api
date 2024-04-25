import React, { useContext, useState } from 'react'
import UserContext from '../UserContext';
import { jwtDecode } from 'jwt-decode';

function WriteComment(props) {
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => { 
        e.preventDefault();
        const decoded = jwtDecode(user.accessToken);
    
        const comments = {user: decoded.user._id, post: props.post._id, content: comment};

        try{
          fetch(`http://localhost:5000/api/${props.paramId}/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            },
          body: JSON.stringify(comments)
        });
        }catch(err){
          console.log(err);
        };
        setComment("");
      };

  return (
    <>
    <form method="POST" onSubmit={handleSubmit}>
        <textarea name="comment" className='comment' id="" cols="30" rows="6" placeholder='Write a comment' onChange={(e) => setComment(e.target.value)} required value={comment}></textarea>
        <button>Comment</button>
    </form>
    </>
  )
}

export default WriteComment