import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Bienvenue sur notre application</h1>
      {isLogin ? <Login onSwitchToSignup={toggleForm} /> : <Signup onSwitchToLogin={toggleForm} />}
    </div>
  );
}

export default App;