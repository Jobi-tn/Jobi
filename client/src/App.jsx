import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from './components/postlist';
import JobOffersList from './components/job/jobofferslis'; 
import Navbar from './components/nav/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CreatePost from './components/CreatePost'; 
import CreateJobOffer from './components/CreateJobOffer';
import SingleJobOffer from './components/job/SingleJobOffer';
import EmployeeForm from './components/EmployeeForm'; // Import EmployeeForm

function App() {
  const [searchParams, setSearchParams] = useState({ searchTerm: '', experience: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isEmployeeSignup, setIsEmployeeSignup] = useState(true);

  const handleSearch = (params) => {
    setSearchParams(params);
    console.log('Search Params:', params);
  };

  const handleShowSignup = (isSignup) => {
    setIsEmployeeSignup(isSignup);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignupComplete = () => {
    setIsAuthenticated(true); // Ensure the user is marked as authenticated after signup
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/posts" element={<PostList />} exact />
            <Route path="/jobs" element={<JobOffersList searchParams={searchParams} />} exact />
            <Route path="/jobs/:id" element={<SingleJobOffer />} exact />
            <Route path="/create" element={<CreatePost />} exact />
            <Route path="/create-job" element={<CreateJobOffer />} exact/>
            <Route path="/employee-form" element={<EmployeeForm />} exact/> {/* Ensure this route is accessible */}
          </Routes>
        </div>
      ) : (
        <div>
          {showLogin ? (
            <Login onShowSignup={handleShowSignup} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Signup isEmployee={isEmployeeSignup} onSignupComplete={handleSignupComplete} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;