import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import useFetch from '../fetch'; // Assuming useFetch is in a separate file

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [subject, setSubject] = useState('');
  const userEmail = localStorage.getItem("email").replace(/[@.]/g, '');
  const sanitizedEmail = receiverEmail.replace(/[@.]/g, '');

  const { loading: sendingEmail, error: sendError, fetchData: sendEmail } = useFetch();

  const handleChange = (content) => {
    setEditorState(content);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const emailData = {
      receiverEmail: receiverEmail,
      subject: subject,
      content: editorState,
      read: true,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    };

    try {
      await sendEmail(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${sanitizedEmail}/email.json`, options);
      await sendEmail(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/sent.json`, options);
      console.log('Email sent successfully');
      setReceiverEmail('');
      setSubject('');
      setEditorState('');
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };

  return (
    <div style={{ padding: '10px', margin: '10px', backgroundColor: '#EAEDED', height: '100%' }}>
      <h4 style={{ margin: '10px' }}>Compose Email</h4>
      <button style={{ borderRadius: '5px' }}><Link to='/Inbox'>Inbox</Link></button>
      <input
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        type="email"
        placeholder='to'
        style={{ width: '50%', padding: '5px', margin: '10px', borderRadius: '10px' }}
      />
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder='Subject'
        style={{ width: '90%', padding: '5px', margin: '10px', borderRadius: '10px' }}
      />
      <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', margin: '10px', borderRadius: '10px' }}>
        <ReactQuill value={editorState} onChange={handleChange} />
      </div>
      <button onClick={handleSendEmail} style={{ padding: '5px', margin: '10px', borderRadius: '10px' }}>Send Email</button>
    </div>
  );
};

export default ComposeEmail;
