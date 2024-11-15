import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, description };

    axios.post('http://localhost:3000/posts/create', postData)
      .then(response => {
        console.log('Post created:', response.data);
        
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Create a New Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="primary"  type="submit"
        style={{ backgroundColor: '#77b300' }}>
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;