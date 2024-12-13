import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    // Aici poți adăuga logica de autentificare
    console.log('Email:', email);
    console.log('Password:', password);
    // După autentificare cu succes, redirecționează utilizatorul
    navigate('/admin');
  };

  return (
    <div className={classes.login}>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;