import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {name, surname, username, email, password, confirmedPassword};

    try{
          setError("This username is already taken.");
          fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register)
          }).then(() => {
            console.log("registered");
          });

          navigate("/posts/login");
        
      

    }catch(err){
      console.log(err);
    };
      
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/register/allusers").then(
      res => res.json()
    ).then(data => {
      setUsers(data);
      }
    );
  }, []);

  const show = () => {
    console.log(users);
  }

  return (
    <section>
      <h1>register</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)} placeholder='Name'/>
        <input type="text" required name='surname' id='surname' className='surname' onChange={(e) => setSurname(e.target.value)} placeholder='Surname'/>
        <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
        <input type="email" required name='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' minLength={6}/>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' onChange={(e) => setConfirmedPassword(e.target.value)} minLength={6}/>
        <button>Register</button>
        <Link to={"/posts/login"}><p>Login</p></Link>
      </form>
      <p className="error">{error}</p>
      </section>
  )
}

export default Register