import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {name, surname, username, email, password, confirmedPassword};

    try{
      //headers: { "Content-Type": "application/json" },
          axios.post("http://localhost:5000/api/register", register, )
           .then(res => res.data)
           .then(status => {
            if(status === "failed"){
              setError("This username already exists.");
            } else if(status === "match"){
              setError("your passwords do not match.");
            } else if(status === "ok"){
              navigate("/posts/login");
            };
            console.log(status)
          })
           .catch(err => console.log(err))
    }catch(err){
      console.log(err);
    };
      
  };

  const show = () => {
    console.log(error);
  }

  return (
    <section>
      <h1>register</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)} pattern='^-\s' placeholder='Name'/>
        <input type="text" required name='surname' id='surname' className='surname' onChange={(e) => setSurname(e.target.value)} pattern='^-\s' placeholder='Surname'/>
        <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)} pattern='^-\s' placeholder='Username'/>
        <input type="email" required name='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' minLength={6}/>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' onChange={(e) => setConfirmedPassword(e.target.value)} minLength={6}/>
        <button>Register</button>
        <Link to={"/posts/login"}><p>Login</p></Link>
      </form>
      <p className="error">{error}</p>
      <button onClick={show}>check</button>
      </section>
  )
}

export default Register