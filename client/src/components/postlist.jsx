import React, { useState } from 'react'; 
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const dummyPosts = [
  { id: 1, title: 'Post 1', description: 'Description for Post 1' },
  { id: 2, title: 'Post 2', description: 'Description for Post 2' },
];

const PostList = () => {
  const [comments, setComments] = useState({}); // State to hold comments for each post

  const handleCommentChange = (postId, e) => {
    setComments({
      ...comments,
      [postId]: e.target.value, // Update comment for the specific post
    });
  };

  const handleCommentSubmit = (postId) => {
    console.log(`Comment for Post ${postId}:`, comments[postId]);
    setComments({
      ...comments,
      [postId]: '', // Clear the comment input after submission
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center"> 
      {dummyPosts.map(post => (
        <Grid item key={post.id} xs={12} sm={12} md={8}> 
          <Card style={{ margin: '20px', padding: '20px', textAlign: 'center' }}> 
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="body2">{post.description}</Typography>
            </CardContent>
          </Card>
          {/* Comment section for each post */}
          <Card style={{ margin: '20px', padding: '20px', textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6">Leave a Comment</Typography>
              <input 
                type="text" 
                placeholder="Your comment here" 
                value={comments[post.id] || ''} // Bind input value to the specific post's comment
                onChange={(e) => handleCommentChange(post.id, e)} // Handle input change
                style={{ width: '100%', padding: '10px', marginTop: '10px' }} 
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleCommentSubmit(post.id)}
                style={{ marginTop: '10px' }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;