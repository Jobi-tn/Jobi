import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/api/employees/all')
      .then(response => {
        setEmployees(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching employees:', error)
        Swal.fire({
          icon: 'error',
          title: 'Failed to load employees',
          text: 'Please try again later',
          confirmButtonColor: '#00a650'
        })
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="employees-container">
      <h2>Available Professionals</h2>
      <div className="employee-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <img src={employee.pic || 'default-avatar.png'} alt="Profile" />
            <h3>{employee.name} {employee.lastname}</h3>
            <div className="employee-details">
              <p><strong>Skills:</strong> {employee.skills}</p>
              <p><strong>Experience:</strong> {employee.experience} years</p>
              <p><strong>Education:</strong> {employee.education}</p>
              <p><strong>Location:</strong> {employee.location}</p>
            </div>
            <button 
              onClick={() => {
                Swal.fire({
                  title: 'Contact Information',
                  html: `
                    <p>Phone: ${employee.phone_number}</p>
                    <p>Email: ${employee.mail}</p>
                  `,
                  confirmButtonColor: '#00a650'
                })
              }}
              className="contact-btn"
            >
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList 