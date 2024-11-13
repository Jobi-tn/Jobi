// components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:3000/auth/login', { email, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            if (error.response) {
                alert('Login failed: ' + error.response.data);
            } else {
                console.error('Error:', error);
                alert('An error occurred');
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;