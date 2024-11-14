import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Home as HomeIcon, Work as WorkIcon, AccountCircle } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); 

  const isOnPosts = location.pathname === '/posts';
  const buttonText = isOnPosts ? 'Create Post' : 'Create Job Offer';
  const buttonLink = isOnPosts ? '/create' : '/create-job';

  return (
    <AppBar position="static" className='appbarCss'>
      <Toolbar>
        <IconButton component={Link} to="/posts" color="inherit">
          <HomeIcon />
        </IconButton>
        <IconButton component={Link} to="/jobs" color="inherit">
          <WorkIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        <Button 
          component={Link} 
          to={buttonLink} 
          variant="contained" 
          style={{ marginLeft: '10px', backgroundColor: '#77b300' }} // Updated color
        >
          {buttonText} 
        </Button>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;