import React, { useContext } from 'react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';

function Comments(props) {
  const { user } = useContext(UserContext);
  let userDecoded = user === false ? false : jwtDecode(user.accessToken);

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
              <div className="comment2">
                <h3>{comment.content}</h3>
                <span>{new Date(comment.date).toLocaleString()}</span>
                <p>{comment.user.name}</p> 
              </div>
              {
                 userDecoded === false ?(
                  ""
                ) : userDecoded.user._id === comment.user._id ? (
                  <form method="DELETE" onSubmit={e =>  {e.preventDefault(); deleteComments(comment._id)}} className='delete-form'><button className='delete-btn'><i class='bx bx-trash'></i></button> </form>
                ) : ""
              }                        
            </div>
          )
        })}
      </div>
  )
}

export default Comments