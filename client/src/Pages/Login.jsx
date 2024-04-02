import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = {username, password};

    fetch("http://localhost:5000/posts/login", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(login)
    }).then(() => {
      console.log("Logged In");
    });
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