import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material'; 

const dummyJobs = [
  { id: 1, position: 'Job 1', description: 'Description for Job 1' },
  { id: 2, position: 'Job 2', description: 'Description for Job 2' },
];


  const JobOffersList = () => {
    return (
      <Grid container spacing={2} justifyContent="center"> 
        {dummyJobs.map(job => (
          <Grid item key={job.id} xs={12} sm={12} md={8}>  
            <Card style={{ margin: '20px', padding: '20px', textAlign: 'center' }}> 
              <CardContent>
                <Typography variant="h5">{job.position}</Typography>
                <Typography variant="body2">{job.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };
export default JobOffersList;