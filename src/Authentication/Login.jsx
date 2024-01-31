import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Slices/LoginSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const navigate =  useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here
    try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7QKapHcEvF2moBWyukFSQBVPh3_Xd3ew',
          {
            method: 'POST',
            body: JSON.stringify({
              email: useremail,
              password: userpassword,
              returnSecureToken: true,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message);
        }
  
        const data = await response.json();
        dispatch(login({ token: data.idToken, email: useremail  }));
        // AuthCtx.login(data.idToken, data.email);
        navigate('/Inbox');
      } catch (error) {
        alert(error.message);
      }
  
      setEmail('');
      setPassword('');

    console.log('Logging in...');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={useremail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={userpassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
