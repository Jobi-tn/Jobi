import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Swal from 'sweetalert2';
import './Signup.css';

function Signup({ isEmployee, onSignupComplete }) {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        nameCompany: '',
        matriculeFiscale: ''
    });
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (e) => {
        const email = e.target.value;
        setFormData({ ...formData, email });

        if (validator.isEmail(email)) {
            setEmailError("Valid Email");
        } else {
            setEmailError("Enter valid Email!");
        }
    };

    const validateForm = () => {
        if (isEmployee) {
            if (!formData.name || !formData.lastname || !formData.email || !formData.password) {
                setError("Veuillez remplir tous les champs obligatoires.");
                return false;
            }
        } else {
            if (!formData.nameCompany || !formData.matriculeFiscale || !formData.email || !formData.password) {
                setError("Veuillez remplir tous les champs obligatoires.");
                return false;
            }
        }

        if (emailError === "Enter valid Email!") {
            setError("Veuillez entrer une adresse email valide.");
            return false;
        }

        setError('');
        return true;
    };

    const handleSignup = () => {
        if (!validateForm()) return;

        const url = isEmployee
            ? 'http://localhost:3000/auth/signup/employee'
            : 'http://localhost:3000/auth/signup/employer';

        const data = isEmployee
            ? { name: formData.name, lastname: formData.lastname, email: formData.email, password: formData.password }
            : { nameCompany: formData.nameCompany, matriculeFiscale: formData.matriculeFiscale, email: formData.email, password: formData.password };

        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Signup Successful!',
                text: 'You can now log in.',
            });
            onSignupComplete()
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: 'An error occurred',
            });
        });
    };

    return (
        <div className="signup-page">
            <div className="signup-right">
                <div className="card">
                    <h2>Signup</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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
                        onChange={validateEmail}
                    />
                    <p style={{ color: emailError === "Valid Email" ? "green" : "red" }}>{emailError}</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button onClick={handleSignup}>Signup</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;