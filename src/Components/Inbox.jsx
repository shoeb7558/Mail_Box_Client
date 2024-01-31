import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InboxPage = () => {
  const [emails, setEmails] = useState([]);
  
  const userEmail = localStorage.getItem("email").replace(/[@.]/g, "");
  console.log(userEmail)
  

  useEffect(() => {
    // Fetch emails from Firebase database
    const fetchEmails = async () => {
      try {
        const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/email.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging statement
        if (data && typeof data === 'object') {
          // Convert object into an array of objects
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
  
    fetchEmails();
  }, []);
  
  

  return (
    <Container className="mt-5">
  <h2 className="mb-4">Inbox</h2>
  <div style={{ display: 'flex' }}>
    <div>
      <button ><Link to='/Editor'>Compose</Link></button>
    </div>
    <div style={{padding:'20px', backgroundColor: 'gray', width: '100%', height: '450px', marginLeft: '5px', overflow: 'auto'  }}>
      <Row>
        {emails.map((email, index) => (
          <Col key={index} style={{ width:'95%'}} lg={1} md={1} sm={1} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{email.subject}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">{email.receiverEmail}</Card.Subtitle> */}
                {/* Render HTML content */}
                <Card.Text dangerouslySetInnerHTML={{ __html: email.content }} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
</Container>

  );
};

export default InboxPage;
