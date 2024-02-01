import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InboxPage = () => {
  const [emails, setEmails] = useState([]);
 
  const userEmail = localStorage.getItem("email").replace(/[@.]/g, "");

  
    const fetchEmails = async () => {
      try {
        const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/email.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
          const emailsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setEmails(emailsArray);
        } else {
          console.error('Fetched data is not an object:', data);
        }
      } catch (error) {
        console.error('Error fetching emails:', error.message);
      }
    };
    
  

  const handleReadMessage = async (id) => {
    try {
      const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/email/${id}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ read: false }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update message status');
      }
      const updatedEmails = emails.map(email => {
        if (email.id === id) {
          return { ...email, read: false };
        }
        return email;
      });
      setEmails(updatedEmails);
    } catch (error) {
      console.error('Error updating message status:', error.message);
    }
  };



  const handleDeleteMessage = async (id) => {
    try {
      // Delete email from backend
      const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/email/${id}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      // Remove deleted email from frontend display
      const updatedEmails = emails.filter(email => email.id !== id);
      setEmails(updatedEmails);
    } catch (error) {
      console.error('Error deleting message:', error.message);
    }
  };


  useEffect(() => {
    
    fetchEmails();

  
    const intervalId = setInterval(() => {
      fetchEmails();
      
    }, 2000); 

    
    return () => clearInterval(intervalId);
  }, [userEmail]);
  

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#EAEDED' }}>
      <Container className="mt-1" style={{ width: '100%' }}>
        <h2 className="mb-4">Inbox</h2>
        <div style={{ display: 'flex', margin: '1%' }}>
          <div>
            <button style={{ borderRadius: '5px', margin:'2px' }}><Link to='/Editor'>Compose</Link></button>
            <button style={{ borderRadius: '5px', margin:'2px'  }}><Link to='/Sent'>Sent</Link></button>
          </div>
          <div style={{ borderRadius: '5px', padding: '10px', backgroundColor: '#D5DBDB', width: '100%', height: '450px', marginLeft: '5px', overflow: 'auto', margin: '5px' }}>
            <Row>
              {emails.map((email, index) => (
                <Col key={index} style={{ width: '100%' }} lg={1} md={1} sm={1} className="mb-3">
                  <Card style={{backgroundColor:'gray'}} onClick={() => handleReadMessage(email.id)}>
                    {email.read && <div style={{ width: '8px', height: '8px', backgroundColor: 'blue', borderRadius: '50%', marginRight: '5px' }}></div>}
                    <Card.Body>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Card.Title>{email.subject}</Card.Title>
                        <Card.Text dangerouslySetInnerHTML={{ __html: email.content }} />
                        <button onClick={() => handleDeleteMessage(email.id)}>Delete</button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InboxPage;
