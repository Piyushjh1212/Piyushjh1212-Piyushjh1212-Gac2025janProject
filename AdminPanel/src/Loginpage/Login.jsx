// src/Loginpage/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () =>{
     
  }


  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='input'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='input'
        />
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  );
}


