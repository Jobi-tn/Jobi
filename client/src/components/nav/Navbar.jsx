import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon, Home as HomeIcon, Work as WorkIcon, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
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
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            style={{ color: 'black', padding: '0 10px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '4px' }}
          />
          <IconButton type="submit" style={{ position: 'absolute', right: 0, top: 0 }}>
            <SearchIcon style={{ color: 'white' }} />
          </IconButton>
        </div>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;