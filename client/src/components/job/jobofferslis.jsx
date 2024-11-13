import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
// Removed Navbar import
import './jobofferlis.css'; // Import custom CSS

const JobOffersList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobs/getall');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []); // Fetch jobs only once when the component mounts

  const filteredJobs = jobs.filter(job => {
    const matchesPosition = job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExperience = experience ? job.experience >= parseInt(experience) : true;
    return matchesPosition && matchesExperience;
  });

  return (
    <div>
      {/* Removed Navbar component */}
      <div className="search-container">
        <TextField
          label="Search by Position"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <TextField
          label="Minimum Experience (years)"
          variant="outlined"
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="experience-input"
        />
      </div>
      <Grid container spacing={4} justifyContent="flex-end"> 
        {filteredJobs.map(job => (
          <Grid item key={job.idjobposts} xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '40%', margin: '20px', padding: '20px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px' }}>
              <CardContent>
                <Typography variant="h5">{job.position}</Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Typography variant="caption">Experience: {job.experience} years</Typography>
                <Typography variant="caption">Status: {job.status ? 'Open' : 'Closed'}</Typography>
                <Button variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: '#77b300' }}>
                 Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default JobOffersList;