import React, { useState, useContext } from 'react'
import axios from 'axios';
import UserContext, { userProvider } from '../UserContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {user, setUser} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/posts/login", {username, password});
    }catch(err){
      console.log(err);
    };
    // fetch("http://localhost:5000/posts/login", {
    //   method: "POST",
    //   headers: {"content-Type": "application/json"},
    //   body: JSON.stringify(login)
    // }).then(() => {
    //   console.log("Logged In");
    // });
  };

  return (
    <userProvider>
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
    </userProvider>
  )
}

export default Login