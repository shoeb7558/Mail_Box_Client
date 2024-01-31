// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './Authentication/SignUp';
import LoginForm from './Authentication/Login';
import ComposeEmail from './Components/TextEditor';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Editor" element={<ComposeEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
