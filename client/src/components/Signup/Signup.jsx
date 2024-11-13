// components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [isEmployee, setIsEmployee] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        nameCompany: '',
        matriculeFiscale: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        const url = isEmployee ? 'http://localhost:3000/employee/signup' : 'http://localhost:3000/employer/signup';
        const data = isEmployee
            ? { name: formData.name, lastname: formData.lastname, email: formData.email, password: formData.password }
            : { nameCompany: formData.nameCompany, matriculeFiscale: formData.matriculeFiscale, email: formData.email, password: formData.password };

        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            if (error.response) {
                alert('Signup failed: ' + error.response.data);
            } else {
                console.error('Error:', error);
                alert('An error occurred');
            }
        });
    };

    return (
        <div>
            <h2>Signup</h2>
            <button onClick={() => setIsEmployee(true)}>Signup as Employee</button>
            <button onClick={() => setIsEmployee(false)}>Signup as Employer</button>
            {isEmployee ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        name="nameCompany"
                        placeholder="Company Name"
                        value={formData.nameCompany}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="matriculeFiscale"
                        placeholder="Matricule Fiscale"
                        value={formData.matriculeFiscale}
                        onChange={handleChange}
                    />
                </div>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}

export default Signup;