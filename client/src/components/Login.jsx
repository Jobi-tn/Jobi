import React, { useState } from "react";
import axios from "axios";

function Login({ onSwitchToSignup }) {
    const [mail, setmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/api/employees/login', { email: mail, password })
        .then((response) => {
           console.log("Login successful:", response.data);
       })
       .catch((error) => {
        console.error("Login failed:", error);
        setError(error.response?.data || "Login failed. Please check your credentials.");
    });
    
    };

    return (
        <div className="Login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>Don't have an account? <button onClick={onSwitchToSignup}>Sign Up</button></p>
        </div>
    );
}

export default Login;
