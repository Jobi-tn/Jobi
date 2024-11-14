import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid } from '@mui/material';

const SearchJobs = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [experience, setExperience] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, experience });
  };

  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Search Position"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Experience (years)"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchJobs;