import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from './components/postlist';
import JobOffersList from './components/job/jobofferslis'; 
import Navbar from './components/nav/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CreatePost from './components/CreatePost'; 
import CreateJobOffer from './components/CreateJobOffer';

function App() {
  const [searchParams, setSearchParams] = useState({ searchTerm: '', experience: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [isEmployeeSignup, setIsEmployeeSignup] = useState(true)

  const handleSearch = (params) => {
    setSearchParams(params);
    console.log('Search Params:', params);
  };

  const handleShowSignup = (issginup) => {
    setIsEmployeeSignup(issginup);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/posts" element={<PostList />} />
            <Route path="/jobs" element={<JobOffersList searchParams={searchParams} />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/create-job" element={<CreateJobOffer />} />
          </Routes>
        </div>
      ) : (
        <div>
          {showLogin ? (
            <Login onShowSignup={handleShowSignup} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Signup isEmployee={isEmployeeSignup} onSignupComplete={handleShowLogin} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
