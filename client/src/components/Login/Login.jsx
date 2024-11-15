import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator'; // Importer la bibliothèque validator
import './Login.css';

function Login({ onShowSignup, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Réinitialiser les messages d'erreur
        setEmailError('');
        setPasswordError('');

        // Vérifier si les champs sont remplis
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Valider l'email
        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email');
            return;
        }

        // Vérifier la longueur du mot de passe
        if (password.length < 8) {
            setPasswordError('Incomplete Password');
            return;
        }

        // Effectuer la requête de connexion
        axios.post('http://localhost:3000/auth/login', { email, password })
            .then(response => {
                const data = response.data;

                // Vérifier si un token est reçu
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Welcome!', 
                    });
                    onLoginSuccess();
                    navigate('/posts');
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'Login Successful',
                        text: 'User  logged in successfully without a token.',
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'An error occurred',
                });
            });
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <img src="../../../public/logojobi.png" alt="Jobi Logo" className="jobi-logo" />
                <p>
                    JOBI is a professional networking platform designed to connect users with job opportunities, foster collaboration, and support career growth, making it easy to build a strong professional network and unlock new career possibilities.
                </p>
            </div>
            <div className="login-right">
                <div className="card">
                    <h2>Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    
                    <button onClick={handleLogin}>Login</button>
                    
                    <div className="other-buttons">
                        <button onClick={() => onShowSignup(true)}>Sign Up as Employee</button>
                        <button onClick={() => onShowSignup(false)}>Sign Up as Employer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}""

export default Login;