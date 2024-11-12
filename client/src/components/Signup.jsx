import React, { useState } from "react";
import axios from "axios";

function Signup({ onSwitchToLogin }) {
    const [userType, setUserType] = useState("employee");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [matriculeFiscale, setMatriculeFiscale] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (password.length <= 8) {
                setError("Password must be more than 8 characters.");
                return;
            }

            // Vérifier l'email
            const emailCheck = await axios.post("http://localhost:3000/api/checkemail", {
                email: mail
            });

            if (emailCheck.data.exists) {
                setError("Email is already in use.");
                return;
            }

            // Procéder à l'inscription
            const userData = userType === "employee" 
                ? { name, lastName, mail, password } 
                : { mail, password, companyName, matriculeFiscale };

            const response = await axios.post("http://localhost:3000/api/signup", userData);
            console.log("Signup successful:", response.data);
            onSwitchToLogin();

        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            setError(error.response?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="Signup-container">
            <h2>Sign Up</h2>
            <select 
                onChange={(e) => setUserType(e.target.value)} 
                value={userType}
                className="w-full p-2 mb-4 border rounded"
            >
                <option value="employee">Employee</option>
                <option value="company">Company</option>
            </select>
            <form onSubmit={handleSignup} className="space-y-4">
                {userType === "employee" && (
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                {userType === "company" && (
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Matricule Fiscale"
                            value={matriculeFiscale}
                            onChange={(e) => setMatriculeFiscale(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                )}
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
            <p className="mt-4 text-center">
                Already have an account? 
                <button 
                    onClick={onSwitchToLogin}
                    className="ml-2 text-blue-500 hover:text-blue-600"
                >
                    Log In
                </button>
            </p>
        </div>
    );
}

export default Signup;