import React, { useState } from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios here

const SingleJobOffer = () => {
  const { state } = useLocation();
  const job = state.job; 

  const [recipientEmail, setRecipientEmail] = useState("malloukaad@gmail.com");
  const [subject, setSubject] = useState("application");
  const [message, setMessage] = useState("ahla ahlaaxfghjk");
  const [status, setStatus] = useState('');
  
  const handleSendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-email', {
        recipientEmail,
        subject,
        message,
      });

      if (response.status === 200) {
        setStatus('Email sent successfully!');
      }
    } catch (error) {
      setStatus('Failed to send email');
    }
  };

  return (
    <Card style={{ margin: '20px', padding: '20px', textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h4">{job.position}</Typography>
        <Typography variant="body1">{job.description}</Typography>
        <Typography variant="caption">Experience: {job.experience} years</Typography>
        <Typography variant="caption">Status: {job.status ? 'Open' : 'Closed'}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: '10px', backgroundColor: '#77b300' }} 
          onClick={handleSendEmail}
        >
          Apply Now
        </Button>
      </CardContent>
      {status && <p>{status}</p>}
    </Card>
  );
};

export default SingleJobOffer;
