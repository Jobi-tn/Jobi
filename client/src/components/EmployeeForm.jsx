import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import './employeeForm.css';


function EmployeeForm() {
  const [formData, setFormData] = useState({
    pic: '',
    skills: '',
    experience: '',
    age: '',
    education: '',
    location: '',
    phone_number: ''
  })

  const validateForm = () => {
    if (!formData.skills || !formData.experience || !formData.age) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#00a650'
      })
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    Swal.fire({
      title: 'Creating Profile',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })

    axios.post('http://localhost:3000/api/employees/create', formData)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Created!',
          text: 'Your professional profile has been created successfully',
          confirmButtonColor: '#00a650',
          timer: 2000,
          timerProgressBar: true
        })
        setFormData({
          pic: '',
          skills: '',
          experience: '',
          age: '',
          education: '',
          location: '',
          phone_number: ''
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response?.data?.message || 'Something went wrong',
          confirmButtonColor: '#00a650',
          footer: 'Please try again or contact support'
        })
      })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Your Professional Profile</h2>
        <div className="form-group">
          <input 
            name="pic" 
            value={formData.pic}
            placeholder="Profile Picture URL" 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <input name="skills" placeholder="Skills" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="experience" placeholder="Experience" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="age" placeholder="Age" type="number" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="education" placeholder="Education" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="location" placeholder="Location" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="phone_number" placeholder="Phone Number" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">
          Create Profile
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm 