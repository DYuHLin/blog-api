import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1>Login</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="password">Password: </label>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)}/>
        <button>Login</button>
      </form>
      </section>
  )
}

export default Login