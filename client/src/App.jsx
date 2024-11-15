import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/postlist';
import JobOffersList from './components/job/jobofferslis'; 
import Navbar from './components/nav/Navbar'; 
import './App.css';
import CreatePost from './components/CreatePost'; 
import CreateJobOffer from './components/CreateJobOffer'; 
import SingleJobOffer from './components/job/SingleJobOffer'; 


function App() {
  const [searchParams, setSearchParams] = useState({ searchTerm: '', experience: null });

  const handleSearch = (params) => {
    setSearchParams(params);
    console.log('Search Params:', params);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/jobs" element={<JobOffersList searchParams={searchParams} />} />
        <Route path="/jobs/:id" element={<SingleJobOffer />} /> {/* Add this route */}
        <Route path="/create" element={<CreatePost />} />
        <Route path="/create-job" element={<CreateJobOffer />} />
      </Routes>
    </Router>
  );
}

export default App;