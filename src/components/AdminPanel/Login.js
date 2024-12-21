import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        dispatch(cartActions.loginAdmin(true));
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginCard}>
        <h2 className={classes.loginTitle}>Admin Login</h2>
        <form onSubmit={submitHandler}>
          <div className={classes.formControl}>
            <label htmlFor="email" className={classes.formLabel}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.formInput}
              required
            />
          </div>
          <div className={classes.formControl}>
            <label htmlFor="password" className={classes.formLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.formInput}
              required
            />
          </div>
          {error && <p className={classes.errorText}>{error}</p>}
          <button type="submit" className={classes.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
