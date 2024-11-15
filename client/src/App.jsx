import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import EmployerForm from '../components/EmployerForm'
import './App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employers/new" element={<EmployerForm />} />
      </Routes>
    </Router>
  )
}

export default App
