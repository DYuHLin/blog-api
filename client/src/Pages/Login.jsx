import React, { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../UserContext';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/login", {username, password});
      setUser(res.data);
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
    navigate('/posts');
  };

  return (
      <section>
        <h1>Login</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
          <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button>Login</button>
        </form>
        <Link to={"/posts/register"}><p>Register</p></Link>
        </section>
  )
}

export default Login