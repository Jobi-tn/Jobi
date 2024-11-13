// App.js
import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
    return (
        <div>
            <h1>Welcome to Jobi</h1>
            <Login />
            <Signup />
        </div>
    );
}

export default App;