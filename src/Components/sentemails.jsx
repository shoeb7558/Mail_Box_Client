import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const SentPage = () => {
  const [sentEmails, setSentEmails] = useState([]);
  const userEmail = localStorage.getItem("email").replace(/[@.]/g, "");

  useEffect(() => {
    const fetchsentEmails = async () => {
      try {
        const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/${userEmail}/sent.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
          const emailsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setSentEmails(emailsArray);
        } else {
          console.error('Fetched data is not an object:', data);
        }
      } catch (error) {
        console.error('Error fetching emails:', error.message);
      }
    };
    fetchsentEmails();
  }, [userEmail]);
  
  

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#EAEDED' }}>
      <Container className="mt-1" style={{ width: '100%' }}>
        <h2 className="mb-4">Sent</h2>
        <div style={{ borderRadius: '5px', padding: '10px', backgroundColor: '#D5DBDB', width: '100%', height: '450px', overflow: 'auto', margin: '5px' }}>
          <Row>
            {sentEmails.map((email, index) => (
              <Col key={index} lg={12} className="mb-3">
                <Card style={{backgroundColor:'gray'}}>
                  <Card.Body>
                    <div>
                      <Card.Title>{email.subject}</Card.Title>
                      <Card.Text dangerouslySetInnerHTML={{ __html: email.content }} />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SentPage;
