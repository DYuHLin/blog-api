import React, { useEffect, useState } from 'react'

function Comments(props) {

  const deleteComments = (id) => {
    fetch(`http://localhost:5000/api/${id}/deletecomment`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }).then(() => {
      navigate('/posts');
    })
  };

  return (
    <section>
      {props.comments.map((comment) => {
        return(
            <div className="comment">
            <h3>{comment.content}</h3>
            <span>{comment.date}</span>
            <p>{comment.user.name}</p> 
            <button onClick={deleteComments(comment._id)}>Delete</button>
          </div>
        )
      })}
    </section>
  )
}

export default Comments