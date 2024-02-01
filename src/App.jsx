// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './Authentication/SignUp';
import LoginForm from './Authentication/Login';
import ComposeEmail from './Components/TextEditor';
import { useSelector } from 'react-redux';
import InboxPage from './Components/Inbox';
import Home from './Components/home';



function App() {
  const auth = useSelector((state) => state.auth);
  
 
  return (
    <Router>
      <Routes>
        {!auth.isLoggedIn && <Route path="/Signin" element={<SignUpForm />} />}
        {!auth.isLoggedIn && <Route path="/login" element={<LoginForm />} />}
        {auth.isLoggedIn &&  <Route path="/Editor" element={<ComposeEmail />} />}
        <Route path="/" element={<Home />} />
        {auth.isLoggedIn && <Route path="/Inbox" element={<InboxPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
