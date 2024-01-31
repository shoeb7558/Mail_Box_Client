import React, { useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    // Add your signup logic here
    if (!email || !password || !confirmPassword) {
        alert('All fields are mandatory!');
        return;
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1WvV5oP182FlmvtPzPvOhczNk0n0TOaQ',
      {
          method: 'POST',
          body: JSON.stringify({
              email: email,
              password : password,
              returnSecureToken: true
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      }
      ).then((res) => {
          if(res.ok){
              console.log('successful signin')
          }else{
              return res.json().then(data => {
                  console.log(data)
                  alert('SignIn Fail')
              })
          }
      })
  
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      console.log('Signing up...');
    };
    
  

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
