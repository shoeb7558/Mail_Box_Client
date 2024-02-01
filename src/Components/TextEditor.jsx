import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState('');
  const [receiverEmail, setreceiverEmail] = useState('')
  const [subject, setsubject] = useState('');
  const sanitizedEmail = receiverEmail.replace(/[@.]/g, '');

  const handleChange =  (content) => {
    setEditorState(content);
  };
  

  const sendEmail = async (e) => {
    e.preventDefault();
    const emailData = {
        receiverEmail: receiverEmail,
        subject: subject,
        content: editorState,
        read:true
      };

      try {
        const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${sanitizedEmail}/email.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to send email');
        }
  
        console.log('Email sent successfully');
        
        // Clear the fields after sending email
        setreceiverEmail('');
        setsubject('');
        setEditorState('');
      } catch (error) {
        console.error('Error sending email:', error.message);
      }
    
    console.log('Sending email with content:', editorState);
  };

  return (
    <div style={{padding:'10px',margin:'10px', backgroundColor:'#EAEDED', height:'100%'}}>
      <h4 style={{margin:'10px'}}>Compose Email</h4>
      <button style={{borderRadius:'5px'}}><Link to='/Inbox'>Inbox</Link></button>
      <input 
      value={receiverEmail}
      onChange={(e) => setreceiverEmail(e.target.value)}
       type="email" 
       placeholder='to'
        style={{width: '50%', padding: '5px', margin:'10px', borderRadius:'10px'}}/>

      <input
      value={subject}
      onChange={(e) => setsubject(e.target.value)}
       placeholder='Subject'
        style={{width:'90%', padding: '5px', margin:'10px', borderRadius:'10px'}}/>

      <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px', margin:'10px',borderRadius:'10px' }}>
        <ReactQuill value={editorState} onChange={handleChange} />
      </div>
      <button onClick={sendEmail} style={{padding:'5px', margin:'10px', borderRadius:'10px'}}>Send Email</button>
    </div>
  );
};

export default ComposeEmail;

