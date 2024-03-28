import React, { useEffect, useState } from 'react'

function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const register = {name, surname, username, email, password, confirmedPassword};
    
     fetch("http://localhost:5000/posts/register", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(register)
     }).then(() => {
      console.log("registered");
     });
  };

  useEffect(() => {

  }, []);

  return (
    <section>
      <h1>register</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)}/>
        <label htmlFor="surname">Surname: </label>
        <input type="text" required name='surname' id='surname' className='surname' onChange={(e) => setSurname(e.target.value)}/>
        <label htmlFor="username">Username: </label>
        <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)}/>
        <label htmlFor="email">Email: </label>
        <input type="email" required name='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password: </label>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)}/>
        <label htmlFor="confirmedPassword">Confirm Password: </label>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' onChange={(e) => setConfirmedPassword(e.target.value)}/>
        <button>Register</button>
      </form>
      </section>
  )
}

export default Register