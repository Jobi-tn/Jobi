import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/postlist';
import JobOffersList from './components/jobofferslis';
import Navbar from './components/nav/Navbar'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/posts" element={<PostList />} />
        <Route path="/jobs" element={<JobOffersList />} />
      </Routes>
    </Router>
  );
}

export default App