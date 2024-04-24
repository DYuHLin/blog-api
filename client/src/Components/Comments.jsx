import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext';

function Comments(props) {
  const { user } = useContext(UserContext);

  const deleteComments = (id) => {
    fetch(`http://localhost:5000/api/${id}/deletecomment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + user.accessToken
        },
    }).then(() => {
      navigate('/posts');
    })
  };

  return (
   
      <div className="blog">
        {props.comments.map((comment) => {
          return(
            <div className='comment-section'>
              <div className="comment">
                <h3>{comment.content}</h3>
                <span>{comment.date}</span>
                <p>{comment.user.name}</p> 
              </div>
              {/* <button onClick={deleteComments(comment._id)}>Delete</button> */}
            </div>
          )
        })}
      </div>
  )
}

export default Comments