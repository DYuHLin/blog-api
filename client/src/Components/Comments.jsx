import React, { useEffect, useState } from 'react'

function Comments(props) {

  const [comments, setComments] = useState([{}]);

  const showComments = () => {
    console.log(props.comments);
  };

  return (
    <section>
      <button onClick={showComments}>show</button>
    </section>
  )
}

export default Comments