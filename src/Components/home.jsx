import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
    const auth = useSelector((state) => state.auth);
  return (
    <div style={{margin:'20px', display:'flex'}}>
       
      <h2>welcome to your mail </h2>
      <div style={{width:'70%' ,margin:'10px',gap:'10px', display:'flex',alignItems:'end', justifyContent:'end'}}>
      {!auth.isLoggedIn &&<Link to='./Signin'>SignIn</Link>}
      {!auth.isLoggedIn && <Link to='./login'>Login</Link>}
      {auth.isLoggedIn &&<Link to='./Inbox'>Inbox</Link>}
      {auth.isLoggedIn && <Link to='./Editor'>Compose</Link>}
      </div>
    </div>
  )
}

export default Home
