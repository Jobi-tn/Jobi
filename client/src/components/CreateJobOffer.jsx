import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateJobOffer = () => {
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [status, setStatus] = useState(true); // Default to 'Open'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = { position, description, experience, status };

    axios.post('http://localhost:3000/jobs/create', jobData)
      .then(response => {
        console.log('Job offer created:', response.data);
        navigate('/jobs'); // Redirect to job offers list
      })
      .catch(error => {
        console.error('Error creating job offer:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4">Create Job Offer</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Experience (years)"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#77b300' }}>
          Create Job Offer
        </Button>
      </form>
    </div>
  );
};

export default CreateJobOffer;