import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const submitHandler = async (event) => {
    event.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;        
        if (user) {
            dispatch(cartActions.loginAdmin(true)); // Setează starea de autentificare în Redux
        }else{
            console.log('User not authenticated');
        }
      } catch (error) {
        // setError(error.message);
      }
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